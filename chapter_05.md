# အခန်း ၅: Composite Types - Arrays, Slices, Maps

ယခုအခန်းတွင် Go ၏ အသုံးအများဆုံး composite data types များဖြစ်သော Arrays, Slices, နှင့် Maps တို့အကြောင်းကို လေ့လာသွားပါမည်။ ဤ data types များသည် data အစုအဝေးများကို စုစည်းသိမ်းဆည်းရန်အတွက် အလွန်အရေးပါပါသည်။

---

## Arrays

Array ဆိုသည်မှာ data type တစ်မျိုးတည်းကိုသာ သိမ်းဆည်းနိုင်သော၊ အရွယ်အစား (size) ပုံသေ သတ်မှတ်ထားသည့် data collection တစ်ခုဖြစ်သည်။ Array တစ်ခုကို ကြေညာလိုက်သည်နှင့် ၎င်း၏ အရွယ်အစားကို ပြောင်းလဲ၍မရပါ။ Go တွင် Array ကို Slices များလောက် အသုံးမများသော်လည်း Slices ၏ အလုပ်လုပ်ပုံကို နားလည်ရန်အတွက် Array သည် အခြေခံကျပါသည်။

```go
package main

import "fmt"

func main() {
    // အရွယ်အစား 5 ရှိသော integer array တစ်ခုကို ကြေညာခြင်း
    var numbers [5]int
    numbers[0] = 10
    numbers[4] = 50

    fmt.Println("Array:", numbers) // Output: Array: [10 0 0 0 50]
    fmt.Println("Length:", len(numbers)) // Output: Length: 5

    // ကြေညာစဉ် တန်ဖိုးများ တခါတည်းထည့်သွင်းခြင်း
    primes := [3]int{2, 3, 5}
    fmt.Println("Primes:", primes) // Output: Primes: [2 3 5]
}
```

---

## Slices

Slice သည် Array အပေါ်တွင် တည်ဆောက်ထားသော ပိုမို flexible ဖြစ်ပြီး အစွမ်းထက်သည့် data structure ဖြစ်သည်။ Array ကဲ့သို့ အရွယ်အစား ပုံသေမဟုတ်ဘဲ dynamic (ပြောင်းလွယ်ပြင်လွယ်) ဖြစ်သောကြောင့် Go developer များ အသုံးအများဆုံးဖြစ်သည်။ Slice သည် underlying array တစ်ခုကို ညွှန်ပြနေသော pointer တစ်ခု၊ length နှင့် capacity တို့ဖြင့် ဖွဲ့စည်းထားသည်။

*   **Length (`len()`):** Slice ထဲတွင် လက်ရှိရှိနေသော element အရေအတွက်။
*   **Capacity (`cap()`):** Slice ၏ underlying array တွင် element မည်မျှအထိ ထပ်မံထည့်သွင်းနိုင်စွမ်း ရှိသည်ကို ဖော်ပြသည်။

### Length နှင့် Capacity အကြား ကွာခြားချက် (အသေးစိတ်)

Slice ၏ အလုပ်လုပ်ပုံကို နားလည်ရန် `length` နှင့် `capacity` ကို ရှင်းလင်းစွာ သိထားရန် အလွန်အရေးကြီးပါသည်။

*   **Length** ဆိုသည်မှာ slice ထဲတွင် **လက်ရှိ မြင်နေရသော element အရေအတွက်** ဖြစ်သည်။
*   **Capacity** ဆိုသည်မှာ slice ၏ နောက်ကွယ်ရှိ **underlying array တွင် memory အသစ်ပြန်မတောင်းဘဲ နောက်ထပ် element မည်မျှအထိ ထပ်ထည့်နိုင်သေးသည်**ကို ညွှန်ပြသော စွမ်းဆောင်ရည်ဖြစ်သည်။

အောက်ပါ ဥပမာကို ကြည့်ပြီး တစ်ဆင့်ချင်း လေ့လာကြည့်ကြပါစို့။

```go
package main

import "fmt"

func main() {
    // 1. အရွယ်အစား 6 ရှိသော array တစ်ခု ဖန်တီးခြင်း
    numbersArray := [6]int{10, 20, 30, 40, 50, 60}

    // 2. Array မှ slice တစ်ခု ဖန်တီးခြင်း (index 2 မှ 4 မတိုင်ခင်အထိ)
    mySlice := numbersArray[2:4] // [30, 40]
    
    fmt.Printf("mySlice: %v\n", mySlice)
    fmt.Printf("Length: %d\n", len(mySlice))     // မြင်နေရသော element 2 ခု
    fmt.Printf("Capacity: %d\n", cap(mySlice))   // index 2 မှ array အဆုံးထိ ရေတွက်မည် (30, 40, 50, 60) -> 4 ခု

    // 3. Capacity မပြည့်သေးဘဲ element ထပ်ထည့်ခြင်း (append)
    // underlying array ၏ နေရာလွတ်တွင် ဆက်ထည့်သွားမည်။
    mySlice = append(mySlice, 70)
    
    fmt.Printf("\nAfter appending 70:\n")
    fmt.Printf("mySlice: %v, Length: %d, Capacity: %d\n", mySlice, len(mySlice), cap(mySlice))
    // underlying array ပါ ပြောင်းလဲသွားသည်ကို သတိပြုပါ
    fmt.Println("Original Array is now:", numbersArray) // Output: [10 20 30 40 70 60]

    // 4. Capacity ကျော်လွန်သွားအောင် ထပ်ထည့်ခြင်း
    // လက်ရှိ cap = 4, len = 4 ဖြစ်နေ၍ နေရာမရှိတော့ပါ။
    // Go က array အသစ်တစ်ခု (အရွယ်အစား နှစ်ဆ ဖြစ်လေ့ရှိ) ကို တည်ဆောက်ပြီး data တွေ copy ကူးထည့်ပါမည်။
    mySlice = append(mySlice, 80, 90)

    fmt.Printf("\nAfter appending 80, 90 (exceeding capacity):\n")
    fmt.Printf("mySlice: %v, Length: %d, Capacity: %d\n", mySlice, len(mySlice), cap(mySlice)) // Capacity အသစ် (ဥပမာ- 8) ဖြစ်သွားမည်။
    
    // array အသစ်ကို ညွှန်းဆိုသွားသောကြောင့် မူလ array ကို ထိခိုက်တော့မည် မဟုတ်ပါ။
    fmt.Println("Original Array remains unchanged:", numbersArray)
}
```

**အနှစ်ချုပ်:**
*   `append` လုပ်သည့်အခါ `capacity` ထက်မကျော်လျှင် မူလ underlying array တွင်သာ data များ ထပ်ဖြည့်သည်။
*   `capacity` ကို ကျော်သွားလျှင် Go က **array အသစ်တစ်ခု** တည်ဆောက်ပြီး data အားလုံးကို copy ကူးထည့်ကာ ထို array အသစ်ကို slice က ပြန်လည်ညွှန်းဆိုပါသည်။ ဤအခြေအနေတွင် မူလ array နှင့် အဆက်အသွယ် ပြတ်တောက်သွားပါသည်။

### Slice ဖန်တီးခြင်း

```go
// Array မှ slice တစ်ခု ဖန်တီးခြင်း
primes := [6]int{2, 3, 5, 7, 11, 13}
var s []int = primes[1:4] // index 1 မှ 3 အထိ ယူမည်
fmt.Println(s) // Output: [3 5 7]

// Slice literal ဖြင့် တိုက်ရိုက်ဖန်တီးခြင်း
fruits := []string{"Apple", "Banana", "Cherry"}
fmt.Println(fruits) // Output: [Apple Banana Cherry]
```

### `make()` နှင့် `append()` Functions

`make()` function ကို အသုံးပြု၍ length နှင့် capacity သတ်မှတ်ပြီး slice တစ်ခုကို ဖန်တီးနိုင်သည်။ `append()` function ကို အသုံးပြု၍ slice ၏ အဆုံးတွင် element အသစ်များ ထပ်ထည့်နိုင်သည်။

```go
package main

import "fmt"

func main() {
    // length 0, capacity 5 ရှိသော string slice တစ်ခုကို make ဖြင့် ဖန်တီးခြင်း
    mySlice := make([]string, 0, 5)
    fmt.Printf("len=%d cap=%d %v\n", len(mySlice), cap(mySlice), mySlice)

    // Element များ ထပ်ထည့်ခြင်း
    mySlice = append(mySlice, "Go")
    mySlice = append(mySlice, "Programming")
    mySlice = append(mySlice, "is", "fun")

    fmt.Printf("len=%d cap=%d %v\n", len(mySlice), cap(mySlice), mySlice)
}
```

---

## Maps

Map ဆိုသည်မှာ key-value pair များဖြင့် data များကို သိမ်းဆည်းသော unordered collection တစ်ခုဖြစ်သည်။ အခြား language များရှိ hash tables သို့မဟုတ် dictionaries များနှင့် ဆင်တူသည်။ Key ၏ data type နှင့် value ၏ data type ကို ကြေညာရာတွင် သတ်မှတ်ပေးရသည်။

```go
package main

import "fmt"

func main() {
    // string key နှင့် int value ရှိသော map တစ်ခုကို make ဖြင့် ဖန်တီးခြင်း
    ages := make(map[string]int)

    // Key-value pairs များ ထည့်သွင်းခြင်း
    ages["Aung Aung"] = 25
    ages["Ma Ma"] = 30

    fmt.Println("Map:", ages)
    fmt.Println("Aung Aung's age:", ages["Aung Aung"])

    // Element တစ်ခုကို ဖျက်ခြင်း
    delete(ages, "Ma Ma")
    fmt.Println("After delete:", ages)

    // Key ရှိမရှိ စစ်ဆေးခြင်း
    // `val` တွင် value ကို ရရှိပြီး `ok` တွင် key ရှိ/မရှိ (true/false) ကို ရရှိမည်
    val, ok := ages["Kyaw Kyaw"]
    if ok {
        fmt.Println("Kyaw Kyaw's age is", val)
    } else {
        fmt.Println("Kyaw Kyaw's age not found.")
    }
}
```

### Map Iteration Order (အစီအစဉ်တကျ မဖြစ်ခြင်း)

အလွန်အရေးကြီးသော အချက်တစ်ခုမှာ Go တွင် map ကို `for-range` loop ဖြင့် iterate လုပ်သည့်အခါ element များ ထွက်ပေါ်လာသည့် အစီအစဉ်သည် သင် data ထည့်သွင်းခဲ့သည့် အစီအစဉ်အတိုင်း ဖြစ်မည်ဟု **အာမမခံပါ**။

**အဘယ်ကြောင့် အစီအစဉ်တကျ မဖြစ်ရသနည်း။**

1.  **Hash Table Implementation:** Map များကို နောက်ကွယ်တွင် hash table data structure ဖြင့် တည်ဆောက်ထားပါသည်။ Data တစ်ခုကို ထည့်သွင်းသည့်အခါ key ကို hash function ဖြင့် တွက်ချက်ပြီး ရလာသော hash value ပေါ်မူတည်၍ memory တွင် နေရာချပါသည်။ ထို့ကြောင့် iteration လုပ်သည့်အခါ ထို memory နေရာများ၏ အစီအစဉ်အတိုင်းသာ ထွက်ပေါ်လာပြီး သင်ထည့်သွင်းခဲ့သည့် အစီအစဉ်အတိုင်း မဟုတ်ပါ။

2.  **Intentional Randomization:** ပို၍သေချာစေရန်မှာ၊ Go runtime သည် map iteration တိုင်း၏ စတင်မည့်နေရာကို **တမင်သက်သက် random ပြုလုပ်ထားပါသည်**။ ဤသို့ပြုလုပ်ရခြင်းမှာ developer များက မထင်မှတ်ဘဲ iteration order တစ်ခုခုအပေါ် မှီခိုနေသော code များ ရေးသားမိခြင်းမှ ကာကွယ်ရန်ဖြစ်ပါသည်။

```go
// ဥပမာ: Map iteration order သည် run တိုင်းတွင် ပြောင်းလဲနိုင်သည်
package main

import "fmt"

func main() {
    m := map[string]int{
        "one":   1,
        "two":   2,
        "three": 3,
        "four":  4,
    }

    // ဤ loop ကို run တိုင်း ရလဒ်အစီအစဉ် ပြောင်းလဲနိုင်သည်
    for k, v := range m {
        fmt.Printf("Key: %s, Value: %d\n", k, v)
    }
}
```

#### အစီအစဉ်တကျ လိုအပ်ပါက မည်သို့ပြုလုပ်မည်နည်း။

Map မှ data များကို အစီအစဉ်တကျ (ဥပမာ- key ၏ ABC အစဉ်အတိုင်း) လိုအပ်ပါက၊ အောက်ပါအတိုင်း လုပ်ဆောင်နိုင်ပါသည်။

1.  Map မှ key များအားလုံးကို slice တစ်ခုထဲသို့ ထည့်ပါ။
2.  ထို slice ကို `sort` package အသုံးပြု၍ sort လုပ်ပါ။
3.  Sort လုပ်ပြီးသား slice ကို loop ပတ်ပြီး map မှ value များကို တစ်ခုချင်း ပြန်လည်ထုတ်ယူပါ။

```go
import "sort"

// ... (main function အတွင်း)
var keys []string
for k := range m {
    keys = append(keys, k)
}
sort.Strings(keys) // key များကို ABC အစဉ်အတိုင်း sort လုပ်ခြင်း

fmt.Println("\nSorted Iteration:")
for _, k := range keys {
    fmt.Printf("Key: %s, Value: %d\n", k, m[k])
}
```