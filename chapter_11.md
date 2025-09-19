# အခန်း ၁၁: Generics

Go 1.18 တွင် စတင်မိတ်ဆက်ခဲ့သော အစွမ်းထက်ဆုံး feature တစ်ခုဖြစ်သည့် **Generics** အကြောင်းကို ဤအခန်းတွင် လေ့လာသွားပါမည်။ Generics သည် ကျွန်ုပ်တို့အား data type မည်သို့ပင်ဖြစ်စေ အလုပ်လုပ်နိုင်သော functions နှင့် data structures များကို ရေးသားနိုင်စေပြီး ကျွန်ုပ်တို့၏ code များကို ပိုမို flexible ဖြစ်စေကာ ပြန်လည်အသုံးပြုရလွယ်ကူစေသည်။

---

## Generic ဆိုတာဘာလဲ။

Generics ဆိုသည်မှာ တိကျသော data type များပေါ်တွင် မမှီခိုဘဲ အလုပ်လုပ်နိုင်သော code များကို ရေးသားနိုင်သည့် နည်းလမ်းတစ်ခုဖြစ်သည်။ Generics မတိုင်မီက၊ သင်သည် `int` များအတွက် function တစ်ခုနှင့် `float64` များအတွက် အလားတူ function တစ်ခု လိုအပ်ပါက၊ function နှစ်ခု သီးသန့် ရေးသားခဲ့ရသည်။ Generics ဖြင့်၊ သင်သည် type အမျိုးမျိုးအတွက် အလုပ်လုပ်နိုင်သော *type parameter* တစ်ခုကို လက်ခံသည့် function တစ်ခုတည်းကို ရေးသားနိုင်သည်။

**Type parameter** ဆိုသည်မှာ function သို့မဟုတ် type ကို အသုံးပြုသည့်အခါ သတ်မှတ်မည့် type အတွက် placeholder တစ်ခုဖြစ်သည်။

---

## Generic Functions

Generic function ဆိုသည်မှာ type parameters တစ်ခု သို့မဟုတ် တစ်ခုထက်ပို၍ ကြေညာထားသော function ဖြစ်သည်။

### ဥပမာ: `PrintSlice` Function

မည်သည့် type မဆိုရှိသော slice ၏ elements များကို print ထုတ်နိုင်သော function တစ်ခု ရေးကြည့်ကြပါစို့။

```go
package main

import "fmt"

// T သည် မည်သည့် type မဆို ဖြစ်နိုင်သော type parameter ဖြစ်သည်။
func PrintSlice[T any](s []T) {
	for _, v := range s {
		fmt.Printf("%v ", v)
	}
	fmt.Println()
}

func main() {
	// integer slice ဖြင့် PrintSlice ကို ခေါ်ယူခြင်း
	intSlice := []int{1, 2, 3, 4}
	fmt.Print("Integer Slice: ")
	PrintSlice(intSlice) // Go သည် T type ကို int အဖြစ် အလိုအလျောက်သိရှိသည်

	// string slice ဖြင့် PrintSlice ကို ခေါ်ယူခြင်း
	stringSlice := []string{"Hello", "World", "Go"}
	fmt.Print("String Slice: ")
	PrintSlice(stringSlice) // Go သည် T type ကို string အဖြစ် အလိုအလျောက်သိရှိသည်
}
```

ဤဥပမာတွင်၊ `[T any]` သည် `T` ဆိုသော type parameter ကို ကြေညာသည်။ `any` keyword သည် `T` ၏ type မည်သို့မဆို ဖြစ်နိုင်သည်ဟု ဆိုလိုသော *constraint* တစ်ခုဖြစ်သည်။ ကျွန်ုပ်တို့ `PrintSlice(intSlice)` ကို ခေါ်သောအခါ၊ Go compiler သည် `T` ကို `int` ဖြစ်သည်ဟု ကောက်ချက်ချသည်။

---

## Generic Types

ကျွန်ုပ်တို့သည် မည်သည့် type နှင့်မဆို အလုပ်လုပ်သော struct သို့မဟုတ် interface ကဲ့သို့သော generic type များကိုလည်း သတ်မှတ်နိုင်သည်။

### ဥပမာ: Generic `Stack` Data Structure

မည်သည့် type ၏ value များကိုမဆို သိမ်းဆည်းနိုင်သော `Stack` တစ်ခုကို တည်ဆောက်ကြည့်ကြပါစို့။

```go
package main

import "fmt"

// Stack သည် T type ရှိသော slice တစ်ခုကို ကိုင်ထားသည်။
type Stack[T any] struct {
	items []T
}

// Push သည် T type ရှိသော item တစ်ခုကို stack သို့ ထည့်ပေးသည်။
func (s *Stack[T]) Push(item T) {
	s.items = append(s.items, item)
}

// Pop သည် stack မှ နောက်ဆုံး item ကို ဖယ်ရှားပြီး ပြန်ပေးသည်။
func (s *Stack[T]) Pop() (T, bool) {
	if len(s.items) == 0 {
		var zero T // T type အတွက် သုညတန်ဖိုး (zero value) ကို ပြန်ပေးသည်
		return zero, false
	}
	lastIndex := len(s.items) - 1
	item := s.items[lastIndex]
	s.items = s.items[:lastIndex]
	return item, true
}

func main() {
	// integer များအတွက် stack တစ်ခု တည်ဆောက်ခြင်း
	intStack := Stack[int]{}
	intStack.Push(10)
	intStack.Push(20)
	val, _ := intStack.Pop()
	fmt.Printf("Popped from intStack: %d\n", val)

	// string များအတွက် stack တစ်ခု တည်ဆောက်ခြင်း
	stringStack := Stack[string]{}
	stringStack.Push("apple")
	stringStack.Push("banana")
	strVal, _ := stringStack.Pop()
	fmt.Printf("Popped from stringStack: %s\n", strVal)
}
```

ဤနေရာတွင်၊ `Stack[T any]` သည် `T` ဆိုသော type parameter ဖြင့် `Stack` struct ကို သတ်မှတ်သည်။ ထို့နောက် `Stack[int]` သို့မဟုတ် `Stack[string]` ကဲ့သို့သော instance များကို ဖန်တီးနိုင်သည်။

---

## Type Constraints

တစ်ခါတစ်ရံတွင်၊ type parameters အဖြစ် အသုံးပြုနိုင်သော type များကို ကန့်သတ်ရန် လိုအပ်သည်။ ဥပမာအားဖြင့်၊ သင်သည် ကိန်းဂဏန်းများပေါ်တွင်သာ အလုပ်လုပ်သော function တစ်ခုကို ရေးလိုပေမည်။ ဤနေရာတွင် **type constraints** များ ဝင်လာပါသည်။

Constraint ဆိုသည်မှာ type parameter အတွက် ခွင့်ပြုထားသော type များ၏ set ကို သတ်မှတ်သည့် interface တစ်ခုဖြစ်သည်။

### ဥပမာ: `SumNumbers` Function

Slice တစ်ခုရှိ value များကို ပေါင်းရန် generic function တစ်ခု ဖန်တီးကြပါစို့၊ သို့သော် integer နှင့် float type များအတွက်သာ ဖြစ်သည်။

```go
package main

import "fmt"

// Number သည် မည်သည့် integer သို့မဟုတ် floating-point type ကိုမဆို ခွင့်ပြုသော constraint တစ်ခုဖြစ်သည်။
type Number interface {
	~int | ~int32 | ~int64 | ~float32 | ~float64
}

// SumNumbers သည် Number constraint နှင့် ကိုက်ညီသော type ၏ elements များပါဝင်သည့်
// slice တစ်ခု၏ value များကို ပေါင်းပေးသည်။
func SumNumbers[T Number](numbers []T) T {
	var sum T
	for _, n := range numbers {
		sum += n
	}
	return sum
}

func main() {
	intSlice := []int{1, 2, 3, 4}
	fmt.Printf("Sum of ints: %d\n", SumNumbers(intSlice))

	floatSlice := []float64{1.1, 2.2, 3.3}
	fmt.Printf("Sum of floats: %f\n", SumNumbers(floatSlice))

	// အောက်ပါ line သည် compile-time error ဖြစ်စေပါလိမ့်မည်
	// အဘယ်ကြောင့်ဆိုသော် string သည် Number constraint ကို မကျေနပ်သောကြောင့်ဖြစ်သည်။
	// stringSlice := []string{"a", "b"}
	// SumNumbers(stringSlice)
}
```

ဤဥပမာတွင်၊ ကျွန်ုပ်တို့သည် အမျိုးမျိုးသော integer နှင့် float type များ ပါဝင်သော `Number` interface ကို သတ်မှတ်သည်။ `~` သင်္ကေတသည် `int` သာမက၊ underlying type မှာ `int` ဖြစ်သော မည်သည့် type (custom type `type MyInt int` ကဲ့သို့) ကိုမဆို ခွင့်ပြုသည်ဟု ဆိုလိုသည်။ `[T Number]` ကို အသုံးပြုခြင်းဖြင့်၊ `SumNumbers` ကို `Number` constraint ၏ အစိတ်အပိုင်းဖြစ်သော type များ၏ slice များဖြင့်သာ ခေါ်ဆိုနိုင်သည်ဟု compiler ကို ပြောပြသည်။
