# Go Programming စာအုပ် မာတိကာ (TOC)

---

## အပိုင်း ၁: Go ဘာသာစကားနှင့် အခြေခံသဘောတရားများ

* အခန်း ၁: Go ဘာသာစကား မိတ်ဆက်
    * Go ဆိုတာဘာလဲ။
    * ဘာကြောင့် Go ကို ရွေးချယ်သင့်သလဲ။ (Performance, Concurrency, Simplicity)
    * Go ၏ အားသာချက်များနှင့် အသုံးဝင်မှုများ
    * Go ကို အသုံးပြုနေသော နာမည်ကြီး Company များ
* အခန်း ၂: Development Environment တည်ဆောက်ခြင်း
    * Go ကို Install ပြုလုပ်ခြင်း (Windows, macOS, Linux)
    * Workspace နှင့် GOPATH ကို နားလည်ခြင်း
    * Code Editor (VS Code) Setup ပြုလုပ်ခြင်း
    * သင်၏ ပထမဆုံး ပရိုဂရမ်: "Hello, World!"
    * `go run`, `go build`, `go install` Commands များ
* အခန်း ၃: Go ၏ အခြေခံ Syntax များ
    * Variables နှင့် Constants များ ကြေညာခြင်း
    * အခြေခံ Data Types (Numbers, Strings, Booleans)
    * Operators (Arithmetic, Comparison, Logical)
    * Comments ရေးသားခြင်း

---

## အပိုင်း ၂: Control Flow နှင့် Data Structures

* အခန်း ၄: Control Flow (စီးဆင်းမှုကို ထိန်းချုပ်ခြင်း)
    * `if`/`else` statements
    * `switch` statements
    * `for` loops (Go တွင် Loop အမျိုးအစား တစ်ခုတည်းရှိပုံ)
* အခန်း ၅: Composite Types - Arrays, Slices, Maps
    * Arrays: Fixed-size lists
    * Slices: Dynamic arrays (Go တွင် အသုံးအများဆုံး)
        * `len()`, `cap()` functions
        * `make()`, `append()` functions
    * Maps: Key-value pairs
* အခန်း ၆: Structs
    * Struct ဆိုတာဘာလဲ (Custom data types)
    * Struct Fields နှင့် Values များ သတ်မှတ်ခြင်း
    * Methods (Struct နှင့် သက်ဆိုင်သော Functions)
    * Embedded Structs (Struct ထပ်ခြင်း)

---

## အပိုင်း ၃: Code များကို စနစ်တကျ ပြန်လည်အသုံးပြုခြင်း

* အခန်း ၇: Functions
    * Function ကြေညာခြင်း နှင့် ခေါ်ယူအသုံးပြုခြင်း
    * Parameters နှင့် Return Values
    * Multiple Return Values (Error Handling အတွက် အရေးပါပုံ)
    * Variadic Functions
    * Anonymous Functions (Closures)
* အခန်း ၈: Pointers
    * Pointer ဆိုတာဘာလဲ။ (Memory Address)
    * Pointer ကို ဘာကြောင့် သုံးသင့်သလဲ။
    * `&` (address of) နှင့် `*` (dereference) operators
* အခန်း ၉: Interfaces
    * Interface ဆိုတာဘာလဲ။
    * Polymorphism ကို Interfaces ဖြင့် အကောင်အထည်ဖော်ခြင်း
    * Empty Interface (`interface{}`)
* အခန်း ၁၀: Packages နှင့် Modules
    * Package ဆိုတာဘာလဲ။
    * Standard Library မှ Packages များကို `import` လုပ်ခြင်း
    * ကိုယ်ပိုင် Package များ တည်ဆောက်ခြင်း
    * Go Modules (`go mod`) ကို အသုံးပြု၍ Dependencies များကို စီမံခန့်ခွဲခြင်း
* အခန်း ၁၁: Generic
    * Generic ဆိုတာဘာလဲ။ Type Parameters
    * Generic Functions
    * Generic Types (Structs, Interfaces)
    * Type Constraints

---

## အပိုင်း ၄: Go ၏ အစွမ်းထက်ဆုံး Feature - Concurrency

* အခန်း ၁၂: Goroutines
    * Concurrency နှင့် Parallelism ကွာခြားချက်
    * Goroutine ဆိုတာဘာလဲ။ (`go` keyword)
    * `sync.WaitGroup` ကို အသုံးပြုခြင်း
* အခန်း ၁၃: Channels
    * Channel ဆိုတာဘာလဲ။ (Goroutines များကြား ဆက်သွယ်ရေး)
    * Buffered vs. Unbuffered Channels
    * `select` statement ဖြင့် Channels များကို ကိုင်တွယ်ခြင်း

---

## အပိုင်း ၅: လက်တွေ့ အသုံးချခြင်း နှင့် Standard Library

* အခန်း ၁၄: Error Handling
    * Go ၏ Error Handling ပုံစံ (`error` type)
    * Custom Errors များ တည်ဆောက်ခြင်း
    * `panic` နှင့် `recover`
* အခန်း ၁၅: အသုံးများသော Standard Library Packages
    * `fmt` (Input/Output)
    * `os` (Operating System Interactions)
    * `strings`, `strconv` (String Manipulation)
    * `encoding/json` (JSON data ကိုင်တွယ်ခြင်း)
    * `net/http` (Web Server တည်ဆောက်ခြင်း)
* အခန်း ၁၆: Testing in Go
    * `testing` package
    * Unit Tests ရေးသားခြင်း 
    * Table-Driven Tests
    * Benchmarking

---

## အပိုင်း ၆: လက်တွေ့ Project (Simple REST API)

* အခန်း ၁၇: Project - Simple REST API တည်ဆောက်ခြင်း (အပိုင်း ၁)
    * Project Planning
    * HTTP Handlers များ ရေးသားခြင်း
    * Routing ပြုလုပ်ခြင်း
* အခန်း ၁၈: Project - Simple REST API တည်ဆောက်ခြင်း (အပိုင်း ၂)
    * `gorilla/mux` ကို အသုံးပြု၍ Routing ကို တိုးချဲ့ခြင်း
    * GET (by ID), PUT, DELETE Endpoints များ ထပ်တိုးခြင်း
* အခန်း ၁၉: Project - Simple REST API တည်ဆောက်ခြင်း (အပိုင်း ၃) - Database Integration
    * `database/sql` package ကို အသုံးပြုခြင်း
    * PostgreSQL driver ထည့်သွင်းခြင်း
    * CRUD (Create, Read, Update, Delete) operations များ ရေးသားခြင်း
---

## အပိုင်း ၇: အဆင့်မြင့် Data Structures နှင့် Algorithms

* အခန်း ၂၀: အသုံးများသော Data Structures နှင့် Algorithms များ
    * Linked Lists
    * Stacks and Queues
    * Trees (Binary Search Tree)
    * Sorting Algorithms (Bubble Sort, Quick Sort)
    * Backtracking
    * Dynamic Programming

---

## အပိုင်း ၈: အဆင့်မြင့် ခေါင်းစဉ်များနှင့် နောက်ဆက်တွဲ

* အခန်း ၂၁: Context
    * `context` package ဆိုတာဘာလဲ။
    * Request-scoped values, cancellation, နှင့် timeouts
* အခန်း ၂၂: နောက်ထပ် လေ့လာစရာများ (Next Steps)
    * Go Community နှင့် Resources များ
    * အသုံးဝင်သော Third-party Libraries များ
    * ဆက်လက်လေ့လာရန် လမ်းညွှန်ချက်များ
