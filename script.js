
/* some refactor needed */

const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const outcomeDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
const setTwoNumberDecimal = event=> {
    this.value = parseFloat(this.value).toFixed(2);
}
const inputTransactionDate = document.querySelector('#date')
const changeOrderButton = document.querySelector('#organize-btn')

const firstCheck = document.querySelector('#receita')
const secondCheck = document.querySelector('#despesa')


const localStorageTransactions = JSON.parse(localStorage
	.getItem('transactions'))

let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID =>{
	transactions = transactions
	.filter(transaction => transaction.id !== ID )
	
	updateLocalStorage()
	init()
}



const addTransactionIntoDOM = ({amount, name, id, date}) => {
       
       let operator = amount < 0 ? '-' : '+'
       let CSSClass =  amount < 0 ? 'minus' : 'plus'

       const amountWithoutOperator = Math.abs(amount)

       const li = document.createElement('li')


       li.classList.add(CSSClass)
       li.innerHTML = `
       ${name} | ${date}
       <span>${operator} R$ ${amountWithoutOperator}</span>
       <button class="delete-btn" onClick="removeTransaction(${id})">
       x</button>
       `
       if(changeOrderButton.innerHTML === `Mais Antigas`){
       transactionsUl.append(li)

       }else{
         transactionsUl.prepend(li)
       }

}


const changeOrder = () => {

    if(changeOrderButton.innerHTML === `Mais Recentes`){
	changeOrderButton.innerHTML = `Mais Antigas`
      
	   
    }else{
    	changeOrderButton.innerHTML = `Mais Recentes`
    	
    }

    init()
    
}


const getTotal = transactionsAmounts => 
    transactionsAmounts
	.reduce((accumulator, transaction) => accumulator + transaction, 0)
	.toFixed(2)


const getIncome = transactionsAmounts =>
     transactionsAmounts
	.filter(value => value > 0)
	.reduce((accumulator, transaction) => accumulator + transaction, 0)
	.toFixed(2)


const getOutcome = transactionsAmounts =>
	Math.abs(transactionsAmounts
	.filter(value => value < 0)
	.reduce((accumulator, transaction) => accumulator + transaction, 0))
	.toFixed(2)


const updateBalanceValues = () =>{
	
	const transactionsAmounts = transactions.map(({ amount }) => amount)
	
	const total = getTotal(transactionsAmounts)

	const income = getIncome(transactionsAmounts)

	const outcome = getOutcome(transactionsAmounts)

	balanceDisplay.textContent = `R$ ${total}`
	incomeDisplay.textContent = `R$ ${income}`
	outcomeDisplay.textContent = `R$ ${outcome}`
}


const init = () =>{
    
    transactionsUl.innerHTML = ''
	

	transactions.forEach(addTransactionIntoDOM)
	updateBalanceValues()

/*	firstCheck.checked = false
	secondCheck.checked = false*/

}

init()


const updateLocalStorage = () =>{
	localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)


const addToTransactionsArray = (transactionName, transactionAmount, transactionDate) =>{
	transactions.push({
   	id: generateID(), 
   	name: transactionName,
   	date: transactionDate,
   	amount: Number(transactionAmount)
   	
   })
}

const clearInputs = () =>{
   inputTransactionName.value = ''
   inputTransactionAmount.value = ''
   inputTransactionDate.value = ''

}

const handleFormSubmit = event =>{
   event.preventDefault()

   const transactionName = inputTransactionName.value.trim()
   let transactionAmount = ''  
   if (secondCheck.checked == true){
   	transactionAmount = -(inputTransactionAmount.value.trim())
   }else{
     transactionAmount = inputTransactionAmount.value.trim()
   }
   const transactionDate = inputTransactionDate.value.trim()
   const isSomeInputEmpty = transactionName === '' || transactionAmount === '' 
   if (isSomeInputEmpty){
   	 alert("Por favor, preencha pelo menos os campos de Nome e Valor")
   	 return
   }

  
   addToTransactionsArray(transactionName, transactionAmount, transactionDate)
   init ()
   updateLocalStorage()

   clearInputs()

}

form.addEventListener('submit', handleFormSubmit);



firstCheck.addEventListener('click', ()=>{
	if (secondCheck.checked == true){
		secondCheck.checked = false
		firstCheck.checked = true
	}else{
		firstCheck.checked = true
	}
})

secondCheck.addEventListener('click', ()=>{
	if (firstCheck.checked == true){
		firstCheck.checked = false
		secondCheck.checked = true
	}else{
		secondCheck.checked = true
	}
})






