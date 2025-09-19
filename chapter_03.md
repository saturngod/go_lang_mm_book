# အခန်း ၃: Go ၏ အခြေခံ Syntax များ

ယခုအခန်းတွင် Go programming language ၏ အခြေခံအကျဆုံးနှင့် အရေးအကြီးဆုံးဖြစ်သော syntax များကို လေ့လာသွားပါမည်။ Variables, constants, data types, operators နှင့် comments များ မည်သို့ရေးသားရမည်ကို ဥပမာများနှင့်တကွ ရှင်းလင်းဖော်ပြသွားပါမည်။

---

## Variables နှင့် Constants များ ကြေညာခြင်း

Go တွင် တန်ဖိုးများကို မှတ်သားသိမ်းဆည်းရန်အတွက် variables နှင့် constants များကို အသုံးပြုပါသည်။

### Variables

Variable ဆိုသည်မှာ program တစ်ခု run နေစဉ်အတွင်း တန်ဖိုးများ ပြောင်းလဲနိုင်သော memory location တစ်ခု၏ အမည်နာမ ဖြစ်သည်။ Go တွင် variable ကြေညာရန် နည်းလမ်းများစွာရှိသည်။

**1. `var` keyword ဖြင့် ကြေညာခြင်း**

Data type ကို တိတိကျကျ သတ်မှတ်ပေးနိုင်သည်။

```go
// data type ကို သတ်မှတ်ပြီး ကြေညာခြင်း
var name string = "Aung Aung"

// data type မပါဘဲ ကြေညာခြင်း (Go က တန်ဖိုးကိုကြည့်၍ type ကို အလိုအလျောက် သတ်မှတ်ပေးသည်)
var age = 25

// တန်ဖိုးမထည့်ဘဲ ကြေညာခြင်း (zero value ဖြစ်သည့် "" သို့မဟုတ် 0 ကို ရရှိမည်)
var address string
```

**2. Short Variable Declaration (`:=`)**

ဤနည်းလမ်းသည် function များအတွင်းတွင် အသုံးအများဆုံးဖြစ်ပြီး `var` keyword နှင့် type ကို ရေးရန်မလိုဘဲ variable ကို အတို gọn ကြေညာနိုင်သည်။

```go
func main() {
    // `:=` ကို function scope အတွင်းမှာသာ အသုံးပြုနိုင်သည်
    country := "Myanmar"
    population := 55000000

    fmt.Println(country, population)
}
```

### Constants

Constant ဆိုသည်မှာ program တစ်ခုလုံးတွင် တန်ဖိုး လုံးဝမပြောင်းလဲသော variable တစ်မျိုးဖြစ်သည်။ `const` keyword ကို အသုံးပြု၍ ကြေညာသည်။

```go
const PI = 3.14159
const AppVersion = "1.0.2"
```

---

## အခြေခံ Data Types

Go သည် statically typed language ဖြစ်သောကြောင့် variable တိုင်းတွင် data type တစ်ခုရှိရပါမည်။

*   **Numbers:**
    *   `int`: ကိန်းပြည့် (e.g., `-10`, `0`, `100`)။ ကွန်ပျူတာ၏ architecture (32-bit or 64-bit) ပေါ်မူတည်၍ `int32` သို့မဟုတ် `int64` ဖြစ်သည်။
    *   `float64`: ဒသမကိန်း (e.g., `3.14`, `-0.01`)။
    *   `uint`: အပေါင်းကိန်းပြည့် (e.g., `0`, `10`, `200`)။

*   **Strings:**
    *   `string`: စာသားများကို ဖော်ပြရန် အသုံးပြုသည်။ Double quotes (`"`) ကို အသုံးပြု၍ ရေးသားသည်။
    *   ဥပမာ: `var message string = "Hello from Go!"`

*   **Booleans:**
    *   `bool`: မှန်/မှား (`true`/`false`) တန်ဖိုးနှစ်မျိုးတည်းသာ ရှိသည်။
    *   ဥပမာ: `var isReady bool = true`

---

## Operators

Operators များသည် variables နှင့် values များအပေါ်တွင် လုပ်ဆောင်ချက်များ (operations) ကို ပြုလုပ်ရန် အသုံးပြုသော သင်္ကေတများဖြစ်သည်။

*   **Arithmetic Operators:** `+` (ပေါင်း), `-` (နှုတ်), `*` (မြှောက်), `/` (စား), `%` (အကြွင်း)
*   **Comparison Operators:** `==` (ညီမျှ), `!=` (မညီမျှ), `<` (ငယ်သည်), `>` (ကြီးသည်), `<=` (ငယ်သည် သို့မဟုတ် ညီမျှသည်), `>=` (ကြီးသည် သို့မဟုတ် ညီမျှသည်)
*   **Logical Operators:** `&&` (and), `||` (or), `!` (not)

---

## Comments ရေးသားခြင်း

Comment ဆိုသည်မှာ code ၏ လုပ်ဆောင်ချက်ကို ရှင်းပြရန် ရေးသားသော စာသားများဖြစ်ပြီး compiler က ၎င်းတို့ကို ထည့်သွင်းစဉ်းစားခြင်းမရှိပါ။

```go
// ဤသည်မှာ single-line comment ဖြစ်သည်။

/*
  ဤသည်မှာ
  multi-line comment ဖြစ်သည်။
*/
```