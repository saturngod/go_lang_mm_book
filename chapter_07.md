# အခန်း ၇: Functions

Function ဆိုသည်မှာ သီးခြားလုပ်ဆောင်ချက်တစ်ခုကို လုပ်ဆောင်ရန်အတွက် စုစည်းရေးသားထားသော code block တစ်ခုဖြစ်သည်။ Functions များသည် code များကို ပြန်လည်အသုံးပြုနိုင်ရန် (reusability)၊ စနစ်တကျခွဲခြားရန် (organization) နှင့် ဖတ်ရှုရလွယ်ကူစေရန် (readability) အတွက် အဓိကကျသော အစိတ်အပိုင်းများ ဖြစ်ကြသည်။

---

## Function ကြေညာခြင်း နှင့် ခေါ်ယူအသုံးပြုခြင်း

Go တွင် function တစ်ခုကို `func` keyword ဖြင့် ကြေညာသည်။ Function တစ်ခုတွင် အမည်၊ parameters (optional)၊ return types (optional) နှင့် code block (body) တို့ ပါဝင်သည်။

```go
package main

import "fmt"

// Parameter မရှိ၊ return value မရှိသော function
func sayHello() {
    fmt.Println("Hello from a function!")
}

func main() {
    // function ကို ခေါ်ယူအသုံးပြုခြင်း
    sayHello()
}
```

---

## Parameters နှင့် Return Values

Functions များသည် တန်ဖိုးများကို input အဖြစ် (parameters) လက်ခံနိုင်ပြီး၊ လုပ်ဆောင်ချက်များ ပြီးဆုံးသောအခါ တန်ဖိုးများကို output အဖြစ် (return values) ပြန်ပေးနိုင်ပါသည်။

```go
package main

import "fmt"

// `a` နှင့် `b` (int type) ကို parameter အဖြစ် လက်ခံပြီး
// `int` type တန်ဖိုးတစ်ခုကို return ပြန်ပေးသော function
func add(a int, b int) int {
    return a + b
}

// Parameter type တွေ တူညီပါက အတို gọn ရေးနိုင်သည်
func subtract(a, b int) int {
    return a - b
}

func main() {
    sum := add(10, 5)
    fmt.Println("Sum:", sum)

    difference := subtract(10, 5)
    fmt.Println("Difference:", difference)
}
```

---

## Multiple Return Values

Go ၏ အစွမ်းထက်သော feature တစ်ခုမှာ function တစ်ခုမှ တန်ဖိုးများစွာကို တစ်ပြိုင်နက်တည်း return ပြန်ပေးနိုင်ခြင်းဖြစ်သည်။ ဤ feature ကို error handling ပြုလုပ်ရာတွင် တွင်ကျယ်စွာ အသုံးပြုလေ့ရှိသည်။ ပုံမှန်အားဖြင့် function သည် ရလဒ် (result) နှင့် error တစ်ခုကို အတူတကွ ပြန်ပေးလေ့ရှိသည်။

```go
package main

import (
    "fmt"
    "errors"
)

// int နှင့် error ကို multiple values အဖြစ် return ပြန်ပေးသည်
func divide(a, b float64) (float64, error) {
    if b == 0 {
        // 0 ဖြင့် စားပါက error message တစ်ခုကို ပြန်ပေးမည်
        return 0, errors.New("cannot divide by zero")
    }
    // အောင်မြင်ပါက ရလဒ်နှင့် nil (error မရှိ) ကို ပြန်ပေးမည်
    return a / b, nil
}

func main() {
    result, err := divide(10.0, 2.0)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", result)
    }

    result, err = divide(10.0, 0)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", result)
    }
}
```

---

## Variadic Functions

Variadic function ဆိုသည်မှာ parameter အရေအတွက် မတူညီဘဲ လက်ခံနိုင်သော function ဖြစ်သည်။ Parameter ၏ type ရှေ့တွင် `...` ထည့်သွင်း၍ ကြေညာသည်။ Function အတွင်းတွင် ထို parameter ကို slice တစ်ခုအနေဖြင့် ရရှိမည်ဖြစ်သည်။

```go
package main

import "fmt"

func sumAll(numbers ...int) int {
    total := 0
    // `numbers` သည် int slice (`[]int`) တစ်ခုဖြစ်သည်
    for _, num := range numbers {
        total += num
    }
    return total
}

func main() {
    fmt.Println(sumAll(1, 2, 3))       // 3 ခု pass လုပ်ခြင်း
    fmt.Println(sumAll(10, 20, 30, 40)) // 4 ခု pass လုပ်ခြင်း

    // Slice တစ်ခုကို pass လုပ်လိုပါက `...` ဖြင့် unpack လုပ်ရမည်
    nums := []int{5, 5, 5}
    fmt.Println(sumAll(nums...))
}
```

---

## Anonymous Functions (Closures)

Anonymous function ဆိုသည်မှာ အမည်မရှိသော function ဖြစ်သည်။ ၎င်းကို variable တစ်ခုတွင် ထည့်သွင်း၍သော်လည်းကောင်း၊ အခြား function တစ်ခု၏ argument အဖြစ် pass လုပ်၍သော်လည်းကောင်း အသုံးပြုနိုင်သည်။

Anonymous function သည် ၎င်း၏ ပတ်ဝန်းကျင် (surrounding scope) မှ variable များကို ရယူသုံးစွဲနိုင်သည့်အခါ ၎င်းကို **closure** ဟုခေါ်သည်။

```go
package main

import "fmt"

func main() {
    // Anonymous function ကို variable တစ်ခုတွင် သိမ်းဆည်းခြင်း
    add := func(a, b int) int {
        return a + b
    }

    fmt.Println("Sum:", add(3, 4))

    // Closure ဥပမာ
    message := "Hello"
    
    // ဤ anonymous function သည် `message` variable ကို ၎င်း၏ scope အပြင်မှ ရယူသုံးစွဲသည်
    greet := func() {
        fmt.Println(message + " from closure!")
    }

    greet()
}
```

### Closure ၏ လက်တွေ့အသုံးဝင်ပုံ: State ကို မှတ်သားထားသော Functions

Closure ၏ အစွမ်းထက်ဆုံး အသုံးဝင်မှုတစ်ခုမှာ "factory" function များ (function များကို return ပြန်ပေးသော function) တည်ဆောက်ခြင်းဖြစ်သည်။ Return ပြန်လိုက်သော function သည် ၎င်းကိုဖန်တီးခဲ့သည့် parent function ပြီးဆုံးသွားသည့်တိုင်အောင် parent function ၏ scope အတွင်းမှ variable များကို "မှတ်သား" ထားပြီး ပြန်လည်ရယူသုံးစွဲနိုင်စွမ်း ရှိသည်။ ဤနည်းလမ်းဖြင့် ကိုယ်ပိုင် private state များကို ထိန်းသိမ်းထားနိုင်သော function များ ဖန်တီးနိုင်ပါသည်။

ဥပမာကောင်းတစ်ခုမှာ တစ်ခုနှင့်တစ်ခုမတူညီသော ID များ ထုတ်ပေးသည့် generator တစ်ခု တည်ဆောက်ခြင်းဖြစ်သည်။

```mermaid
graph TD
    A[intSeq() called] --> B{Create variable 'i = 0'}
    B --> C{Return a new function (closure)}
    
    subgraph "Closure (nextInt)"
        direction LR
        D["'i' is captured<br/>(current value: 0)"]
        E[Function Body<br/>i++<br/>return i]
    end

    C --> D
    C --> E
```
```go
package main

import "fmt"

// intSeq function သည် အခြား function တစ်ခုကို return ပြန်ပေးသည်။
// return ပြန်လိုက်သော anonymous function သည် 'i' variable ကို "closes over" လုပ်ထားသောကြောင့် closure ဖြစ်လာသည်။
func intSeq() func() int {
    i := 0
    return func() int {
        i++
        return i
    }
}

func main() {
    // nextInt သည် ယခုအခါ ကိုယ်ပိုင် 'i' variable တစ်ခုကို ပိုင်ဆိုင်ထားသော function တစ်ခုဖြစ်သွားသည်။
    nextInt := intSeq()

    // nextInt ကို ခေါ်လိုက်တိုင်း ၎င်း၏ 'i' တန်ဖိုးကို တိုးပြီး ပြန်ပေးမည်။
    fmt.Println(nextInt()) // Output: 1
    fmt.Println(nextInt()) // Output: 2
    fmt.Println(nextInt()) // Output: 3

    fmt.Println("---")

    // အသစ်တစ်ခု ထပ်မံဖန်တီးလိုပါက intSeq() ကို ထပ်ခေါ်ရမည်။
    // ၎င်းသည် လုံးဝသီးခြားဖြစ်သော 'i' variable အသစ်တစ်ခုကို ရရှိမည်ဖြစ်သည်။
    newInts := intSeq()
    fmt.Println(newInts()) // Output: 1
}
```

ဤဥပမာတွင် `intSeq()` function ကို ခေါ်လိုက်သောအခါ `i` ဟူသော variable တစ်ခုကို 0 ဖြင့် စတင်ပြီး function တစ်ခုကို return ပြန်ပေးပါသည်။ `nextInt` သည် ထို return ပြန်လာသော function ဖြစ်ပြီး ၎င်းသည် `i` ကို မှတ်သားထားသည်။ `nextInt()` ကို ခေါ်လိုက်တိုင်း မှတ်သားထားသော `i` ၏ တန်ဖိုးကို တိုးခြင်း၊ ပြန်ပေးခြင်းတို့ကို လုပ်ဆောင်သောကြောင့် state ကို ဆက်တိုက် ထိန်းသိမ်းထားနိုင်ခြင်း ဖြစ်သည်။
```