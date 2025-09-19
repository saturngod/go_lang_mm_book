# အခန်း ၄: Control Flow (စီးဆင်းမှု ထိန်းချုပ်ခြင်း)

`Control Flow` ဆိုသည်မှာ program တစ်ခု၏ code များ မည်သည့်အစဉ်အတိုင်း လုပ်ဆောင်ရမည်ကို ထိန်းချုပ်သော statements များ ဖြစ်သည်။ Go တွင် `if`/`else`, `switch`, နှင့် `for` တို့ကို အသုံးပြု၍ program ၏ စီးဆင်းမှုကို ထိန်းချုပ်နိုင်ပါသည်။

---

## `if`/`else` Statements

`if`/`else` statement သည် အခြေအနေ (condition) တစ်ခု မှန်/မှား ပေါ်မူတည်၍ code block တစ်ခုကို run ရန် သို့မဟုတ် မ run ရန် ဆုံးဖြတ်ပေးသည်။

```go
package main

import "fmt"

func main() {
    age := 20

    if age >= 18 {
        fmt.Println("You are an adult.")
    } else {
        fmt.Println("You are a minor.")
    }

    // Statement နှင့်အတူ if ကို အတို gọn ရေးသားခြင်း
    // ဤနည်းလမ်းတွင် `num` variable ကို if/else block အတွင်းမှာသာ အသုံးပြုနိုင်သည်
    if num := 9; num < 0 {
        fmt.Println(num, "is negative")
    } else if num < 10 {
        fmt.Println(num, "has 1 digit")
    } else {
        fmt.Println(num, "has multiple digits")
    }
}
```

---

## `switch` Statements

`switch` statement သည် variable တစ်ခု၏ တန်ဖိုးကို `case` များစွာနှင့် နှိုင်းယှဉ်စစ်ဆေးရန် အသုံးပြုသည်။ အခြား language များကဲ့သို့ `break` keyword ကို case တိုင်းတွင် ရေးရန်မလိုပါ။ Go တွင် case တစ်ခုပြီးဆုံးပါက switch မှ အလိုအလျောက် ထွက်ခွာပါသည်။

```go
package main

import "fmt"

func main() {
    day := "Monday"

    switch day {
    case "Saturday", "Sunday":
        fmt.Println("It's the weekend!")
    case "Monday":
        fmt.Println("It's the start of the week.")
    default:
        fmt.Println("It's a weekday.")
    }
}
```

---

## `for` Loops

Go တွင် loop အမျိုးအစား တစ်မျိုးတည်းသာရှိပြီး ၎င်းမှာ `for` loop ဖြစ်သည်။ သို့သော် `for` loop ကို ပုံစံအမျိုးမျိုးဖြင့် အသုံးပြုနိုင်ပါသည်။

**1. Classic `for` loop (C-style)**

```go
for i := 0; i < 5; i++ {
    fmt.Println(i)
}
```

**2. `while` loop ကဲ့သို့ အသုံးပြုခြင်း**

```go
n := 0
for n < 5 {
    fmt.Println(n)
    n++
}
```

**3. `for-range` loop (Slices, Maps, Arrays များအတွက်)**

```go
fruits := []string{"Apple", "Banana", "Cherry"}
for index, value := range fruits {
    fmt.Printf("Index: %d, Value: %s\n", index, value)
}
```