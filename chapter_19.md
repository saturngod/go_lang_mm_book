# အခန်း ၁၉: Project - Simple REST API တည်ဆောက်ခြင်း (အပိုင်း ၃) - Database Integration

ယခင် အခန်း ၁၇ နှင့် ၁၈ တွင်၊ ကျွန်ုပ်တို့သည် in-memory data store ကို အသုံးပြု၍ REST API တစ်ခုကို တည်ဆောက်ခဲ့သည်။ ၎င်းသည် API ၏ အလုပ်လုပ်ပုံကို လေ့လာရန် ကောင်းမွန်သော်လည်း၊ application ကို restart လုပ်လိုက်တိုင်း data များ ပျောက်ဆုံးသွားမည်ဖြစ်သည်။ ဤအခန်းတွင်၊ ကျွန်ုပ်တို့၏ data များကို PostgreSQL database တွင် သိမ်းဆည်းခြင်းဖြင့် data persistence ကို အကောင်အထည်ဖော်ပါမည်။

---

## `database/sql` Package ကို အသုံးပြုခြင်း

Go ၏ standard library တွင်ပါဝင်သော `database/sql` package သည် SQL (သို့မဟုတ် SQL-like) databases များနှင့် အလုပ်လုပ်ရန်အတွက် generic interface တစ်ခုကို ပံ့ပိုးပေးသည်။ ၎င်းသည် database-specific details များကို abstract လုပ်ပေးထားပြီး၊ ကျွန်ုပ်တို့အား တသမတ်တည်းဖြစ်သော API ဖြင့် database operations များ လုပ်ဆောင်နိုင်ရန် ကူညီပေးသည်။

`database/sql` package ကိုယ်တိုင်က database နှင့် တိုက်ရိုက်စကားပြောနိုင်စွမ်းမရှိပါ။ ၎င်းသည် **database driver** များနှင့်အတူ အလုပ်လုပ်သည်။ ကျွန်ုပ်တို့သည် PostgreSQL နှင့် ချိတ်ဆက်လိုပါက၊ PostgreSQL အတွက် driver တစ်ခုကို import လုပ်ပေးရန် လိုအပ်သည်။

---

## Database Driver ထည့်သွင်းခြင်း နှင့် ချိတ်ဆက်ခြင်း

ဤ project အတွက်၊ ကျွန်ုပ်တို့သည် PostgreSQL ကို အသုံးပြုပြီး `pq` driver ကို ထည့်သွင်းပါမည်။

**1. Driver ကို Install လုပ်ခြင်း:**

Terminal တွင် အောက်ပါ command ကို run ပါ။

```sh
go get github.com/lib/pq
```

ဤ command သည် `pq` driver ကို download လုပ်ပြီး ကျွန်ုပ်တို့၏ `go.mod` file ထဲသို့ dependency အဖြစ် ထည့်သွင်းပေးပါလိမ့်မည်။

**2. Database နှင့် ချိတ်ဆက်ခြင်း:**

`main.go` သို့မဟုတ် database connection ကို စီမံခန့်ခွဲမည့် file တွင် အောက်ပါကဲ့သို့ ရေးသားရမည်။

```go
package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq" // The database driver
)

const (
	dbHost = "localhost"
	dbPort = 5432
	dbUser = "your_username" // သင်၏ PostgreSQL username ကို ပြောင်းပါ
	dbPassword = "your_password" // သင်၏ PostgreSQL password ကို ပြောင်းပါ
	dbName = "your_dbname"   // သင်၏ database name ကို ပြောင်းပါ
)

func main() {
	// Connection string ကို တည်ဆောက်ခြင်း
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName)

	// Database connection ကို ဖွင့်ခြင်း
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Error opening database: %q", err)
	}
	defer db.Close()

	// Connection အောင်မြင်မှုရှိမရှိ စစ်ဆေးခြင်း
	err = db.Ping()
	if err != nil {
		log.Fatalf("Error connecting to the database: %q", err)
	}

	fmt.Println("Successfully connected to the database!")

	// ... (API server ကို ဤနေရာတွင် run ပါမည်)
}
```

**အရေးကြီးသော မှတ်ချက်များ:**

*   `import _ "github.com/lib/pq"`: `_` (blank identifier) ကို အသုံးပြုရခြင်းမှာ၊ ကျွန်ုပ်တို့သည် `pq` package ကို တိုက်ရိုက်ခေါ်သုံးနေခြင်းမဟုတ်ဘဲ၊ ၎င်း၏ `init` function ကို run စေခြင်းဖြင့် `database/sql` package တွင် "postgres" driver အဖြစ် register လုပ်စေလိုသောကြောင့် ဖြစ်သည်။
*   `sql.Open` သည် database connection ကို ချက်ချင်းမဖွင့်ပါ။ ၎င်းသည် နောက်ကွယ်တွင် connection pool တစ်ခုကို setup လုပ်ပေးပြီး လိုအပ်မှသာ connection များကို တည်ဆောက်သည်။
*   `db.Ping()` ဖြင့် connection အမှန်တကယ်ရမရ စစ်ဆေးရန် အလွန်အရေးကြီးသည်။

---

## CRUD Operations များ ရေးသားခြင်း

HTTP handlers များထဲတွင် database logic များကို တိုက်ရိုက်ရေးသားခြင်းထက်၊ သီးသန့် file သို့မဟုတ် package (`store` သို့မဟုတ် `models` ကဲ့သို့) တစ်ခုတွင် ခွဲထုတ်ရေးသားခြင်းသည် code ကို ပိုမိုရှင်းလင်းစေသည်။

**ဥပမာ: `products` table အတွက် CRUD functions များ**

`products` table ၏ schema မှာ အောက်ပါအတိုင်းဟု ယူဆပါမည်။

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**`store.go`**
```go
package main

import "database/sql"

// Product struct သည် products table row တစ်ခုကို ကိုယ်စားပြုသည်
type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

// CreateProduct သည် product အသစ်တစ်ခုကို database ထဲသို့ ထည့်ပေးသည်
func CreateProduct(db *sql.DB, product *Product) (int, error) {
	var productID int
	// $1, $2 တို့သည် SQL injection ကို ကာကွယ်ပေးသော placeholders များဖြစ်သည်
	err := db.QueryRow(
		"INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id",
		product.Name, product.Price,
	).Scan(&productID)

	if err != nil {
		return 0, err
	}
	return productID, nil
}

// GetProduct သည် ID ဖြင့် product တစ်ခုကို ရှာဖွေပေးသည်
func GetProduct(db *sql.DB, id int) (*Product, error) {
	var p Product
	err := db.QueryRow("SELECT id, name, price FROM products WHERE id = $1", id).Scan(&p.ID, &p.Name, &p.Price)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // Product မတွေ့ပါ
		}
		return nil, err
	}
	return &p, nil
}

// GetProducts သည် products အားလုံးကို ပြန်ပေးသည်
func GetProducts(db *sql.DB) ([]Product, error) {
	rows, err := db.Query("SELECT id, name, price FROM products")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []Product
	for rows.Next() {
		var p Product
		if err := rows.Scan(&p.ID, &p.Name, &p.Price); err != nil {
			return nil, err
		}
		products = append(products, p)
	}
	return products, nil
}

// ... UpdateProduct နှင့် DeleteProduct functions များကို အလားတူပုံစံဖြင့် ရေးသားနိုင်သည်
```

---

## API Endpoints များကို Database နှင့် ချိတ်ဆက်ခြင်း

ယခု ကျွန်ုပ်တို့၏ HTTP handlers များကို ယခင် in-memory store အစား database functions များကို ခေါ်သုံးရန် ပြင်ဆင်ပါမည်။ Handler များသည် `*sql.DB` instance ကို access လုပ်ရန် လိုအပ်မည်ဖြစ်သည်။

```go
// main.go တွင် *sql.DB ကို handler များထံ pass လုပ်ရန် struct တစ်ခု သတ်မှတ်နိုင်သည်
type Env struct {
	db *sql.DB
}

func main() {
	// ... (db connection တည်ဆောက်ပြီး)

	env := &Env{db: db}

	http.HandleFunc("/products", env.getProductsHandler)
	http.HandleFunc("/products/create", env.createProductHandler)
	
	// ... server start
}

func (e *Env) getProductsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	products, err := GetProducts(e.db)
	if err != nil {
		http.Error(w, "Failed to fetch products", http.StatusInternalServerError)
		return
	}
	
	json.NewEncoder(w).Encode(products)
}

func (e *Env) createProductHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var p Product
	if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	productID, err := CreateProduct(e.db, &p)
	if err != nil {
		http.Error(w, "Failed to create product", http.StatusInternalServerError)
		return
	}
	
	p.ID = productID
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(p)
}

func (e *Env) updateProductHandler(w http.ResponseWriter, r *http.Request) {
	// ... (To be implemented)
}

func (e *Env) deleteProductHandler(w http.ResponseWriter, r *http.Request) {
	// ... (To be implemented)
}

func (e *Env) getProductHandler(w http.ResponseWriter, r *http.Request) {
	// ... (To be implemented)
}


// ... အခြား handlers များကိုလည်း အလားတူ ပြင်ဆင်ပါ
```

ဤအခန်းပြီးဆုံးသောအခါ၊ သင်၏ REST API သည် data များကို database တွင် အမှန်တကယ် သိမ်းဆည်းနိုင်၊ ပြန်လည်ထုတ်ယူနိုင်၊ ပြင်ဆင်နိုင်၊ နှင့် ဖျက်ပစ်နိုင်ပြီ ဖြစ်သည်။ ၎င်းသည် production-ready application တစ်ခု တည်ဆောက်ရန်အတွက် အရေးကြီးသော ခြေလှမ်းတစ်ခုဖြစ်သည်။
