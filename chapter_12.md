# အခန်း ၁၂: Goroutines

ယခုအခန်းတွင် Go ၏ အကျော်ကြားဆုံးနှင့် အစွမ်းထက်ဆုံး feature ဖြစ်သော concurrency ကို စတင်လေ့လာပါမည်။ Go သည် Goroutines ဟုခေါ်သော အလွန်ပေါ့ပါးသည့် execution unit များကို အသုံးပြု၍ concurrent programming ကို အလွန်လွယ်ကူအောင် ပြုလုပ်ပေးထားသည်။

---

## Concurrency နှင့် Parallelism ကွာခြားချက်

Concurrency နှင့် Parallelism သည် ဆင်တူသယောင်ရှိသော်လည်း အဓိပ္ပာယ် မတူညီပါ။

*   **Concurrency (တစ်ပြိုင်နက်တည်း စီမံခန့်ခွဲခြင်း):** လုပ်ငန်းတာဝန် (tasks) များစွာကို တစ်ချိန်တည်းတွင် စီမံခန့်ခွဲနိုင်စွမ်းရှိခြင်း ဖြစ်သည်။ Task တစ်ခုကို လုပ်ဆောင်နေစဉ် ခေတ္တရပ်နားပြီး အခြား task တစ်ခုကို ပြောင်းလဲလုပ်ဆောင်နိုင်သည်။ ၎င်းသည် **လုပ်ငန်းများကို စီမံခန့်ခွဲသည့် ပုံစံ (structure)** ဖြစ်ပြီး တစ်ပြိုင်နက်တည်း အမှန်တကယ် run နေရန် မလိုအပ်ပါ။

*   **Parallelism (တစ်ပြိုင်နက်တည်း လုပ်ဆောင်ခြင်း):** လုပ်ငန်းတာဝန်များစွာကို တစ်ချိန်တည်းတွင် အမှန်တကယ် **တစ်ပြိုင်နက်တည်း လုပ်ဆောင်ခြင်း** ဖြစ်သည်။ ၎င်းကို multi-core processor များပေါ်တွင်သာ လုပ်ဆောင်နိုင်ပြီး core တစ်ခုချင်းစီက task တစ်ခုစီကို တစ်ချိန်တည်းမှာပင် လုပ်ဆောင်ပါသည်။

```mermaid
graph TD
    subgraph "Concurrency (Single CPU Core)"
        direction LR
        CPU1["CPU Core"]
        T1["Task A"]
        T2["Task B"]
        T3["Task C"]
        CPU1 -- "switches to" --> T1 -- "switches to" --> T2 -- "switches to" --> T3
    end

    subgraph "Parallelism (Multi-Core)"
        CPU_A["CPU Core 1"] -- "runs" --> Task_A["Task A"]
        CPU_B["CPU Core 2"] -- "runs" --> Task_B["Task B"]
    end
```

Go သည် concurrency ကို အဓိကထား ဒီဇိုင်းထုတ်ထားပြီး၊ multi-core processor များရှိပါက Go runtime က goroutines များကို cores များပေါ်တွင် parallel အဖြစ် အလိုအလျောက် run ပေးပါသည်။

---

## Goroutine ဆိုတာဘာလဲ။ (`go` keyword)

**Goroutine** ဆိုသည်မှာ Go runtime မှ စီမံခန့်ခွဲသော အလွန်ပေါ့ပါးသည့် thread (lightweight thread) တစ်ခုဖြစ်သည်။ OS thread များနှင့် နှိုင်းယှဉ်ပါက memory အသုံးပြုမှု အလွန်နည်းပါးပြီး (kilobytes အနည်းငယ်သာ)၊ ဖန်တီးရန်နှင့် ဖျက်သိမ်းရန် အလွန်မြန်ဆန်သည်။ ထို့ကြောင့် goroutines ထောင်ပေါင်းများစွာ၊ သိန်းပေါင်းများစွာကို တစ်ပြိုင်နက်တည်း run နိုင်ပါသည်။

Function call တစ်ခု၏ ရှေ့တွင် `go` keyword ကို ထည့်သွင်းလိုက်ရုံဖြင့် goroutine အသစ်တစ်ခုကို အလွယ်တကူ ဖန်တီးနိုင်ပါသည်။

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 3; i++ {
        fmt.Println(s)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    // 'say' function ကို goroutine အသစ်တစ်ခုအနေဖြင့် run မည်
    go say("World")

    // main function (main goroutine) က ဆက်လက် run နေမည်
    say("Hello")
}
```

**ပြဿနာ:** အထက်ပါ code ကို run ကြည့်ပါက "Hello" ကိုသာ print ထုတ်ပြီး "World" ကို print ထုတ်သည်ကို မြင်ရချင်မှ မြင်ရမည်။ အကြောင်းမှာ `main` function (main goroutine) သည် `say("World")` goroutine ပြီးဆုံးသည်ကို **မစောင့်ဘဲ** ၎င်း၏အလုပ် ပြီးဆုံးသွားသည်နှင့် program တစ်ခုလုံးကို ရပ်တန့်လိုက်သောကြောင့် ဖြစ်သည်။

---

## `sync.WaitGroup` ကို အသုံးပြုခြင်း

Goroutines များအားလုံး ပြီးဆုံးသည်အထိ main goroutine ကို စောင့်ဆိုင်းစေရန်အတွက် `sync` package မှ `WaitGroup` ကို အသုံးပြုနိုင်ပါသည်။ `WaitGroup` သည် goroutines အစုအဝေးတစ်ခု ပြီးဆုံးသည်အထိ စောင့်ဆိုင်းရန်အတွက် counter တစ်ခုကို အသုံးပြုသည်။

`WaitGroup` တွင် အဓိက method ၃ ခုရှိသည်:

1.  **`Add(delta int)`:** Counter ကို `delta` တန်ဖိုး만큼 တိုးရန်။ စတင်မည့် goroutine အရေအတွက်ကို သတ်မှတ်ရန် အသုံးပြုသည်။
2.  **`Done()`:** Counter ကို ၁ လျှော့ရန်။ Goroutine တစ်ခု ပြီးဆုံးသည့်အခါ ခေါ်ယူရသည်။
3.  **`Wait()`:** Counter ၏ တန်ဖိုး 0 ဖြစ်သွားသည်အထိ (goroutines အားလုံး `Done()` ခေါ်ပြီးသည်အထိ) program ၏ execution ကို block လုပ်ထားရန် (စောင့်ဆိုင်းရန်)။

```mermaid
graph TD
    A[Main Goroutine] -- "wg.Add(2)" --> B{WaitGroup Counter = 2}
    A -- "go worker(1)" --> C[Worker 1]
    A -- "go worker(2)" --> D[Worker 2]
    A -- "wg.Wait()" --> F{Blocks until Counter is 0}
    
    C -- "does work" --> G["..."]
    D -- "does work" --> H["..."]

    G -- "wg.Done()" --> I{Counter = 1}
    H -- "wg.Done()" --> J{Counter = 0}

    J -- "unblocks" --> F
    F --> K[Continue Execution]
```

**`WaitGroup` ဖြင့် ပြင်ဆင်ထားသော ဥပမာ:**

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    // Goroutine ပြီးဆုံးသည့်အခါ WaitGroup counter ကို လျှော့ရန် defer ဖြင့် ကြိုတင်သတ်မှတ်ထားသည်
    defer wg.Done()

    fmt.Printf("Worker %d starting\n", id)

    // အလုပ်လုပ်နေသည်ကို ပုံဖော်ရန် sleep လုပ်ခြင်း
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    // WaitGroup variable တစ်ခု တည်ဆောက်ခြင်း
    var wg sync.WaitGroup

    // Worker goroutines ၃ ခုကို run မည်
    for i := 1; i <= 3; i++ {
        // WaitGroup counter ကို ၁ တိုးသည်
        wg.Add(1)

        // worker function ကို goroutine အဖြစ် run ပြီး WaitGroup pointer ကို pass လုပ်သည်
        go worker(i, &wg)
    }

    // Goroutines အားလုံး ပြီးဆုံးသည်အထိ ဤနေရာတွင် စောင့်ဆိုင်းနေမည်
    wg.Wait()

    fmt.Println("All workers have finished.")
}
```

ဤ code တွင် `main` function သည် `wg.Wait()` နေရာတွင် worker goroutines ၃ ခုလုံး `wg.Done()` ကို ခေါ်ပြီးသည်အထိ စောင့်ဆိုင်းနေမည်ဖြစ်သောကြောင့် worker များအားလုံး၏ output များကို စနစ်တကျ မြင်တွေ့ရမည်ဖြစ်သည်။

---

---

## Race Conditions နှင့် `sync.Mutex`

Goroutines များစွာက variable တစ်ခုတည်းကို တစ်ပြိုင်နက်တည်း ပြောင်းလဲရန် ကြိုးစားသောအခါ **Race Condition** ဖြစ်ပေါ်တတ်သည်။ ၎င်းသည် program ၏ ရလဒ်ကို မမှန်ကန်စေဘဲ၊ ရှာဖွေရခက်ခဲသော bug များကို ဖြစ်စေသည်။

ဤပြဿနာကို ဖြေရှင်းရန် `sync.Mutex` (Mutual Exclusion lock) ကို အသုံးပြုသည်။ `Mutex` သည် ကုဒ်၏ အစိတ်အပိုင်းတစ်ခုကို တစ်ချိန်တည်းတွင် goroutine တစ်ခုတည်းကသာ လုပ်ဆောင်ခွင့်ရစေရန် lock ချပေးသည်။

### Race Condition ဥပမာ (ပြဿနာ)

အောက်ပါ code တွင် goroutine 1000 ခုက `counter` ကို တိုးရန် ကြိုးစားသည်။ Lock မရှိသောကြောင့် `counter` ၏ တန်ဖိုးသည် 1000 ဖြစ်လာမည် မဟုတ်ပါ။

```go
var counter = 0

func increment(wg *sync.WaitGroup) {
    defer wg.Done()
    counter++ // Race Condition ဖြစ်မည့်နေရာ
}
// ရလဒ်: 1000 ထက် လျော့နည်းနေလေ့ရှိသည် (ဥပမာ - 980)
```

### `sync.Mutex` ဖြင့် ဖြေရှင်းခြင်း

```go
package main

import (
    "fmt"
    "sync"
)

var (
    counter = 0
    mu      sync.Mutex // Mutex ကြေညာခြင်း
)

func increment(wg *sync.WaitGroup) {
    defer wg.Done()

    // Critical Section မစမီ Lock ချသည်
    mu.Lock()
    counter++
    // ပြီးဆုံးပါက Unlock ပြန်လုပ်သည်
    mu.Unlock()
}

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go increment(&wg)
    }
    wg.Wait()
    fmt.Println("Final Counter:", counter) // Output: 1000 (Correct)
}
```

---

## Singleton Pattern (`sync.Once`)

Struct များနှင့် ပတ်သက်၍ အသုံးများသော Design Pattern တစ်ခုမှာ **Singleton Pattern** ဖြစ်သည်။ Singleton ဆိုသည်မှာ Application တစ်ခုလုံးတွင် struct instance တစ်ခုတည်းသာ ရှိစေရန် ကန့်သတ်ထားခြင်းဖြစ်သည်။ Concurrency ပါဝင်သော Application များတွင် Singleton ကို thread-safe ဖြစ်စေရန် `sync` package မှ `Once` ကို အသုံးပြုတည်ဆောက်လေ့ရှိသည်။

```go
package main

import (
    "fmt"
    "sync"
)

type database struct {
    connectionString string
}

var (
    instance *database
    once     sync.Once // Thread-safe ဖြစ်စေရန် အသုံးပြုသည်
)

// GetDatabaseInstance သည် database instance ကို ပြန်ပေးသည်
// ပထမဆုံးအကြိမ် ခေါ်ချိန်တွင်သာ instance ကို ဖန်တီးပြီး၊ နောက်ပိုင်းတွင် ရှိပြီးသားကိုသာ ပြန်ပေးသည်
func GetDatabaseInstance() *database {
    once.Do(func() {
        fmt.Println("Creating single database instance...")
        instance = &database{connectionString: "mysql://user:pass@localhost:3306/mydb"}
    })
    return instance
}

func main() {
    var wg sync.WaitGroup

    // Goroutines များစွာက တပြိုင်နက်တည်း Instance ကို ရယူရန် ကြိုးစားခြင်း
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            db := GetDatabaseInstance()
            // အားလုံးသည် memory address အတူတူကိုသာ ရရှိမည်
            fmt.Printf("DB Instance Address: %p\n", db)
        }()
    }
    wg.Wait()
}
```

`sync.Once` သည် `Do` အတွင်းရှိ function ကို program တစ်ခုလုံးတွင် **တစ်ကြိမ်တည်းသာ** အလုပ်လုပ်စေရန် အာမခံပါသည်။ ထို့ကြောင့် goroutines များစွာက ပြိုင်တူခေါ်လျှင်သော်မှ instance တစ်ခုတည်းသာ ဖန်တီးမည်ဖြစ်ပြီး thread-safe ဖြစ်သည်။

### နောက်ထပ် ဥပမာ: Global Configuration

Database connection သာမက Application ၏ Configuration (ဥပမာ - API Keys, App Settings) များကို load လုပ်ရာတွင်လည်း Singleton Pattern ကို အသုံးပြုလေ့ရှိသည်။

```go
type Config struct {
    APIKey    string
    DebugMode bool
}

var (
    configInstance *Config
    configOnce     sync.Once
)

func GetConfig() *Config {
    configOnce.Do(func() {
        configInstance = &Config{
            APIKey:    "AABBCC123",
            DebugMode: true,
        }
    })
    return configInstance
}
```

**သတိပြုရန်:** အထက်ပါ Code တွင် `APIKey` နှင့် `DebugMode` သည် Public fields (အကြီးဖြင့်စထားသည်) ဖြစ်သောကြောင့် အပြင်မှ တိုက်ရိုက် ပြင်ဆင်နိုင်သည်။

```go
cfg := GetConfig()
cfg.DebugMode = false // ဤသို့ပြင်လိုက်ပါက Application တစ်ခုလုံးမှ Config ပြောင်းလဲသွားမည်
```

ဤကဲ့သို့ မလိုလားအပ်သော ပြောင်းလဲမှုများကို ကာကွယ်ရန် **Read-Only Singleton** ပုံစံကို ပြောင်းလဲအသုံးပြုသင့်သည်။

### Safe Global Configuration (Read-Only)

Field များကို private (အသေးဖြင့်စ) အဖြစ်ပြောင်းပြီး၊ တန်ဖိုးယူရန် **Getter methods** များကိုသာ ထုတ်ပေးသင့်သည်။

```go
package main

import (
    "fmt"
    "sync"
)

type Config struct {
    apiKey    string // Private field (ပြင်ခွင့်မပေးပါ)
    debugMode bool   // Private field
}

var (
    safeConfigInstance *Config
    safeConfigOnce     sync.Once
)

// Getter Method for APIKey
func (c *Config) APIKey() string {
    return c.apiKey
}

// Getter Method for DebugMode
func (c *Config) DebugMode() bool {
    return c.debugMode
}

func GetSafeConfig() *Config {
    safeConfigOnce.Do(func() {
        fmt.Println("Loading safe configuration...")
        safeConfigInstance = &Config{
            apiKey:    "AABBCC123",
            debugMode: true,
        }
    })
    return safeConfigInstance
}

func main() {
    cfg := GetSafeConfig()
    
    // Method မှတဆင့် တန်ဖိုးကို ရယူသဖြင့် လုံခြုံမှုရှိသည်
    fmt.Println("API Key:", cfg.APIKey())

    // cfg.apiKey = "NewKey" // Error: field သည် private ဖြစ်သောကြောင့် ပြင်၍မရပါ
}
```