# အခန်း ၁၉: Project - Simple REST API တည်ဆောက်ခြင်း (အပိုင်း ၃) - Database Integration

ယခင် အခန်း ၁၇ နှင့် ၁၈ တွင်၊ ကျွန်ုပ်တို့သည် in-memory data store ကို အသုံးပြု၍ To-Do List REST API တစ်ခုကို တည်ဆောက်ခဲ့သည်။ ၎င်းသည် API ၏ အလုပ်လုပ်ပုံကို လေ့လာရန် ကောင်းမွန်သော်လည်း၊ application ကို restart လုပ်လိုက်တိုင်း data များ ပျောက်ဆုံးသွားမည်ဖြစ်သည်။ ဤအခန်းတွင်၊ ကျွန်ုပ်တို့၏ Task data များကို PostgreSQL database တွင် သိမ်းဆည်းခြင်းဖြင့် data persistence ကို အကောင်အထည်ဖော်ပါမည်။



## `database/sql` Package ကို အသုံးပြုခြင်း

Go ၏ standard library တွင်ပါဝင်သော `database/sql` package သည် SQL (သို့မဟုတ် SQL-like) databases များနှင့် အလုပ်လုပ်ရန်အတွက် generic interface တစ်ခုကို ပံ့ပိုးပေးသည်။ ၎င်းသည် database-specific details များကို abstract လုပ်ပေးထားပြီး၊ ကျွန်ုပ်တို့အား တသမတ်တည်းဖြစ်သော API ဖြင့် database operations များ လုပ်ဆောင်နိုင်ရန် ကူညီပေးသည်။

`database/sql` package ကိုယ်တိုင်က database နှင့် တိုက်ရိုက်စကားပြောနိုင်စွမ်းမရှိပါ။ ၎င်းသည် **database driver** များနှင့်အတူ အလုပ်လုပ်သည်။ ကျွန်ုပ်တို့သည် PostgreSQL နှင့် ချိတ်ဆက်လိုပါက၊ PostgreSQL အတွက် driver တစ်ခုကို import လုပ်ပေးရန် လိုအပ်သည်။



## Database Driver ထည့်သွင်းခြင်း နှင့် ချိတ်ဆက်ခြင်း

ဤ project အတွက်၊ ကျွန်ုပ်တို့သည် PostgreSQL ကို အသုံးပြုပြီး `pgx` driver ကို ထည့်သွင်းပါမည်။ `pgx` သည် Go အတွက် အသုံးအများဆုံး PostgreSQL driver ဖြစ်ပြီး actively maintained ဖြစ်သည်။

**1. Driver ကို Install လုပ်ခြင်း:**

Terminal တွင် အောက်ပါ command ကို run ပါ။

```sh
go get github.com/jackc/pgx/v5/stdlib
```

ဤ command သည် `pgx` driver ကို download လုပ်ပြီး ကျွန်ုပ်တို့၏ `go.mod` file ထဲသို့ dependency အဖြစ် ထည့်သွင်းပေးပါလိမ့်မည်။

**2. Database Table ဖန်တီးခြင်း:**

PostgreSQL database ထဲတွင် `tasks` table ကို ဖန်တီးပါ။

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);
```

**3. Database နှင့် ချိတ်ဆက်ခြင်း:**

`main.go` သို့မဟုတ် database connection ကို စီမံခန့်ခွဲမည့် file တွင် အောက်ပါကဲ့သို့ ရေးသားရမည်။

```go
package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/jackc/pgx/v5/stdlib" // The database driver
)

const (
	dbHost     = "localhost"
	dbPort     = 5432
	dbUser     = "your_username" // သင်၏ PostgreSQL username ကို ပြောင်းပါ
	dbPassword = "your_password" // သင်၏ PostgreSQL password ကို ပြောင်းပါ
	dbName     = "your_dbname"   // သင်၏ database name ကို ပြောင်းပါ
)

func main() {
	// Connection string ကို တည်ဆောက်ခြင်း
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName)

	// Database connection ကို ဖွင့်ခြင်း
	db, err := sql.Open("pgx", psqlInfo)
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

> **Security Best Practice**: Production တွင် password များကို code ထဲတွင် hardcode မရေးသင့်ပါ။ `os.Getenv("DB_PASSWORD")` ကဲ့သို့သော environment variable များမှတဆင့် ဖတ်ယူအသုံးပြုခြင်းသည် ပိုမိုလုံခြုံစိတ်ချရသည်။

**အရေးကြီးသော မှတ်ချက်များ:**

*   `import _ "github.com/jackc/pgx/v5/stdlib"`: `_` (blank identifier) ကို အသုံးပြုရခြင်းမှာ၊ ကျွန်ုပ်တို့သည် `pgx` package ကို တိုက်ရိုက်ခေါ်သုံးနေခြင်းမဟုတ်ဘဲ၊ ၎င်း၏ `init` function ကို run စေခြင်းဖြင့် `database/sql` package တွင် "pgx" driver အဖြစ် register လုပ်စေလိုသောကြောင့် ဖြစ်သည်။
*   `sql.Open` သည် database connection ကို ချက်ချင်းမဖွင့်ပါ။ ၎င်းသည် နောက်ကွယ်တွင် connection pool တစ်ခုကို setup လုပ်ပေးပြီး လိုအပ်မှသာ connection များကို တည်ဆောက်သည်။
*   `db.Ping()` ဖြင့် connection အမှန်တကယ်ရမရ စစ်ဆေးရန် အလွန်အရေးကြီးသည်။



## CRUD Operations များ ရေးသားခြင်း

HTTP handlers များထဲတွင် database logic များကို တိုက်ရိုက်ရေးသားခြင်းထက်၊ သီးသန့် file သို့မဟုတ် package (`store` သို့မဟုတ် `models` ကဲ့သို့) တစ်ခုတွင် ခွဲထုတ်ရေးသားခြင်းသည် code ကို ပိုမိုရှင်းလင်းစေသည်။

ယခင်အခန်းများတွင် အသုံးပြုခဲ့သော `Task` struct ကိုပင် ဆက်လက်အသုံးပြုပြီး database CRUD functions များကို ရေးသားပါမည်။

**`store.go`**
```go
package main

import "database/sql"

// Task struct (အခန်း ၁၇ မှ အတူတူပင်ဖြစ်သည်)
type Task struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

// CreateTask သည် task အသစ်တစ်ခုကို database ထဲသို့ ထည့်ပေးသည်
func CreateTask(db *sql.DB, task *Task) (int, error) {
	var taskID int
	// $1, $2 တို့သည် SQL injection ကို ကာကွယ်ပေးသော placeholders များဖြစ်သည်
	err := db.QueryRow(
		"INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING id",
		task.Title, task.Completed,
	).Scan(&taskID)

	if err != nil {
		return 0, err
	}
	return taskID, nil
}

// GetTask သည် ID ဖြင့် task တစ်ခုကို ရှာဖွေပေးသည်
func GetTask(db *sql.DB, id int) (*Task, error) {
	var t Task
	err := db.QueryRow("SELECT id, title, completed FROM tasks WHERE id = $1", id).Scan(&t.ID, &t.Title, &t.Completed)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // Task မတွေ့ပါ
		}
		return nil, err
	}
	return &t, nil
}

// GetTasks သည် tasks အားလုံးကို ပြန်ပေးသည်
func GetTasks(db *sql.DB) ([]Task, error) {
	rows, err := db.Query("SELECT id, title, completed FROM tasks")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var t Task
		if err := rows.Scan(&t.ID, &t.Title, &t.Completed); err != nil {
			return nil, err
		}
		tasks = append(tasks, t)
	}
	// rows.Next() loop ပြီးဆုံးပြီးနောက် iteration error ရှိ/မရှိ စစ်ဆေးရန် အရေးကြီးသည်
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return tasks, nil
}

// UpdateTask သည် task အချက်အလက်များကို ပြင်ဆင်သည်
func UpdateTask(db *sql.DB, id int, task *Task) (int64, error) {
	res, err := db.Exec("UPDATE tasks SET title = $1, completed = $2 WHERE id = $3", task.Title, task.Completed, id)
	if err != nil {
		return 0, err
	}
	return res.RowsAffected()
}

// DeleteTask သည် task တစ်ခုကို ဖျက်ပစ်သည်
func DeleteTask(db *sql.DB, id int) (int64, error) {
	res, err := db.Exec("DELETE FROM tasks WHERE id = $1", id)
	if err != nil {
		return 0, err
	}
	return res.RowsAffected()
}
```

> **`rows.Err()` ကို စစ်ဆေးခြင်း:** `rows.Next()` loop ပြီးဆုံးပြီးနောက် `rows.Err()` ကို အမြဲတမ်း စစ်ဆေးသင့်သည်။ Loop ပြီးဆုံးသွားခြင်းသည် data ကုန်၍ ပြီးဆုံးခြင်း ဖြစ်နိုင်သလို network error သို့မဟုတ် driver error ကြောင့် ရပ်တန့်သွားခြင်းလည်း ဖြစ်နိုင်သည်။ `rows.Err()` ကို မစစ်ဆေးပါက ထိုအမှားများ silent ဖြစ်သွားပြီး ပျောက်ဆုံးနေသော data ကို ရရှိနိုင်ပါသည်။



## API Endpoints များကို Database နှင့် ချိတ်ဆက်ခြင်း

ယခု ကျွန်ုပ်တို့၏ HTTP handlers များကို ယခင် in-memory store အစား database functions များကို ခေါ်သုံးရန် ပြင်ဆင်ပါမည်။ Handler များသည် `*sql.DB` instance ကို access လုပ်ရန် လိုအပ်မည်ဖြစ်သည်။ အခန်း ၁၈ တွင် လေ့လာခဲ့သော Go 1.22 ၏ enhanced ServeMux ကို ဆက်လက်အသုံးပြုပါမည်။

```go
// main.go တွင် *sql.DB ကို handler များထံ pass လုပ်ရန် struct တစ်ခု သတ်မှတ်နိုင်သည်
type Env struct {
	db *sql.DB
}

func main() {
	// ... (db connection တည်ဆောက်ပြီး)

	env := &Env{db: db}

	// Go 1.22: Method နှင့် Path Variable ကို pattern တွင် တိုက်ရိုက်သတ်မှတ်ခြင်း
	mux := http.NewServeMux()
	mux.HandleFunc("GET /tasks", env.getTasksHandler)
	mux.HandleFunc("POST /tasks", env.createTaskHandler)
	mux.HandleFunc("GET /tasks/{id}", env.getTaskHandler)
	mux.HandleFunc("PUT /tasks/{id}", env.updateTaskHandler)
	mux.HandleFunc("DELETE /tasks/{id}", env.deleteTaskHandler)

	fmt.Println("Starting REST API server on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}

func (e *Env) getTasksHandler(w http.ResponseWriter, r *http.Request) {
	tasks, err := GetTasks(e.db)
	if err != nil {
		http.Error(w, "Failed to fetch tasks", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func (e *Env) createTaskHandler(w http.ResponseWriter, r *http.Request) {
	var t Task
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	taskID, err := CreateTask(e.db, &t)
	if err != nil {
		http.Error(w, "Failed to create task", http.StatusInternalServerError)
		return
	}

	t.ID = taskID
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(t)
}

func (e *Env) getTaskHandler(w http.ResponseWriter, r *http.Request) {
	// Go 1.22: r.PathValue("id") ကို အသုံးပြု၍ path variable ကို ရယူသည်
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	task, err := GetTask(e.db, id)
	if err != nil {
		http.Error(w, "Failed to get task", http.StatusInternalServerError)
		return
	}

	if task == nil {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

func (e *Env) updateTaskHandler(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	var t Task
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	rowsAffected, err := UpdateTask(e.db, id, &t)
	if err != nil {
		http.Error(w, "Failed to update task", http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	t.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(t)
}

func (e *Env) deleteTaskHandler(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	rowsAffected, err := DeleteTask(e.db, id)
	if err != nil {
		http.Error(w, "Failed to delete task", http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
```

ဤအခန်းပြီးဆုံးသောအခါ၊ အခန်း ၁၇ နှင့် ၁၈ တွင် တည်ဆောက်ခဲ့သော To-Do List REST API သည် data များကို PostgreSQL database တွင် အမှန်တကယ် သိမ်းဆည်းနိုင်၊ ပြန်လည်ထုတ်ယူနိုင်၊ ပြင်ဆင်နိုင်၊ နှင့် ဖျက်ပစ်နိုင်ပြီ ဖြစ်သည်။ ၎င်းသည် production-ready application တစ်ခု တည်ဆောက်ရန်အတွက် အရေးကြီးသော ခြေလှမ်းတစ်ခုဖြစ်သည်။
