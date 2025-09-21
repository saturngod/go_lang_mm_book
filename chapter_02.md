# အခန်း ၂: Development Environment တည်ဆောက်ခြင်း

Go programming language ဖြင့် software များ စတင်ရေးသားရန်အတွက် လိုအပ်သော development environment ကို မည်သို့တည်ဆောက်ရမည်ကို ဤအခန်းတွင် လေ့လာသွားပါမည်။ Go ကို install ပြုလုပ်ခြင်းမှစ၍ သင်၏ ပထမဆုံး "Hello, World!" program ကို ရေးသား run ကြည့်ခြင်းအထိ အဆင့်ဆင့် လမ်းညွှန်ပေးသွားပါမည်။

---

## Go ကို Install ပြုလုပ်ခြင်း (Windows, macOS, Linux)

Go ကို စတင်အသုံးပြုရန်အတွက် သင်၏ ကွန်ပျူတာတွင် Go compiler နှင့် tools များကို install ပြုလုပ်ရန် လိုအပ်ပါသည်။

Go ၏ တရားဝင် website ဖြစ်သော [go.dev/dl/](https://go.dev/dl/) တွင် သင်၏ operating system (Windows, macOS, Linux) အတွက် installer များကို အလွယ်တကူ download ရယူပြီး install ပြုလုပ်နိုင်ပါသည်။

Installation ပြီးစီးကြောင်း စစ်ဆေးရန် သင်၏ terminal သို့မဟုတ် command prompt တွင် အောက်ပါ command ကို ရိုက်ထည့်ကြည့်ပါ။

```sh
go version
```

`go version go1.xx.x` ကဲ့သို့သော စာကြောင်းကို မြင်ရပါက Go ကို အောင်မြင်စွာ install ပြုလုပ်ပြီးဖြစ်ပါသည်။

---

## Workspace နှင့် GOPATH ကို နားလည်ခြင်း

ယခင် Go version များတွင် `GOPATH` သည် Go projects များ၏ workspace ကို သတ်မှတ်ပေးသော environment variable တစ်ခုဖြစ်ပြီး အရေးပါခဲ့ပါသည်။ သို့သော် Go version 1.11 မှစ၍ **Go Modules** စနစ်ကို စတင်မိတ်ဆက်ခဲ့ပြီးနောက်ပိုင်းတွင် `GOPATH` ၏ အရေးပါမှုမှာ လျော့ကျသွားခဲ့သည်။

ယခုခေတ် Go development တွင် project များကို သင်၏ computer ရှိ မည်သည့် directory တွင်မဆို တည်ဆောက်နိုင်ပြီး `go mod` command ဖြင့် dependency များကို စီမံခန့်ခွဲနိုင်ပြီ ဖြစ်သောကြောင့် ပိုမိုလွယ်ကူလာပါသည်။ ဤစာအုပ်တွင်လည်း Go Modules ကို အခြေခံ၍ ဆက်လက်ရှင်းလင်းသွားပါမည်။

---

## Code Editor (VS Code) Setup ပြုလုပ်ခြင်း

Go code များကို ရေးသားရန်အတွက် text editor အမျိုးမျိုးကို အသုံးပြုနိုင်သော်လည်း Visual Studio Code (VS Code) သည် Go developer များကြားတွင် ရေပန်းအစားဆုံး editor တစ်ခုဖြစ်သည်။

1.  VS Code ကို download လုပ်ပြီး install ပြုလုပ်ပါ။
2.  VS Code ကိုဖွင့်ပြီး Extensions view (Ctrl+Shift+X) သို့ သွားပါ။
3.  Search bar တွင် `Go` ဟု ရိုက်ရှာပြီး **Go Team at Google** မှ ထုတ်ဝေသော extension ကို install ပြုလုပ်ပါ။
4.  ၎င်း extension က code completion, debugging, testing နှင့် အခြားသော အသုံးဝင်သည့် feature များစွာကို ထောက်ပံ့ပေးပါလိမ့်မည်။

---

## သင်၏ ပထမဆုံး ပရိုဂရမ်: "Hello, World!"

သင်၏ ပထမဆုံး Go program ကို စတင်ရေးသားကြည့်ကြပါစို့။

1.  `hello` အမည်ဖြင့် project folder အသစ်တစ်ခု တည်ဆောက်ပါ။
2.  Terminal တွင် ထို folder ထဲသို့ `cd hello` ဖြင့် ဝင်ပါ။
3.  `go mod init example.com/hello` command ဖြင့် module အသစ်တစ်ခု ဖန်တီးပါ။
4.  `main.go` အမည်ဖြင့် file အသစ်တစ်ခုဖွင့်ပြီး အောက်ပါ code များကို ရေးသားပါ။

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

- `package main`: ဤ file သည် executable program တစ်ခုဖြစ်ကြောင်း ကြေညာသည်။
- `import "fmt"`: "format" package ကို import လုပ်ခြင်းဖြစ်သည်။ ၎င်း package တွင် `Println` ကဲ့သို့သော printing functions များ ပါဝင်သည်။
- `func main()`: Program စတင်အလုပ်လုပ်မည့် အဓိက function ဖြစ်သည်။
- `fmt.Println(...)`: Console တွင် စာသားများကို print ထုတ်ပေးသည်။

---

## `go run`, `go build`, `go install` Commands များ

Terminal တွင် `main.go` file ရှိသော directory ထဲ၌ အောက်ပါ command များကို စမ်းသပ်ကြည့်နိုင်ပါသည်။

- **`go run main.go`**

  - Code ကို compile လုပ်ပြီး တိုက်ရိုက် run ပေးသည်။ Executable file အသစ်ကို မဖန်တီးပါ။ Development ပြုလုပ်နေစဉ် program ကို အမြန်စမ်းသပ်ရန် အသုံးဝင်သည်။

- **`go build`**

  - Code ကို compile လုပ်ပြီး လက်ရှိ directory ထဲတွင် `hello` (Windows တွင် `hello.exe`) အမည်ဖြင့် executable file တစ်ခု တည်ဆောက်ပေးသည်။ ထို file ကို အခြားနေရာများသို့ copy ယူပြီး တိုက်ရိုက် run နိုင်ပါသည်။

- **`go install`**
  - Code ကို compile လုပ်ပြီး ရလာသော executable file ကို `$GOPATH/bin` (သို့မဟုတ် `GOBIN` သတ်မှတ်ထားလျှင် ထိုနေရာ) တွင် install ပြုလုပ်ပေးသည်။ ၎င်းသည် command-line tool များ ဖြန့်ဝေရန် အသုံးဝင်သည်။
