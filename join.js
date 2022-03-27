const years = document.getElementById('years');
const declare = document.querySelector('.declare');

const email = document.getElementById('email')
const qual = document.getElementById('qual')
const mname = document.getElementById('name')

const btn = document.getElementById('btn')
const form = document.getElementById('form')
const loading = document.getElementById('loading')

let skills =""

const checkboxes = document.querySelectorAll('.skill1')
for (let checkbox of checkboxes){
  checkbox.addEventListener('click',function(){
    if(this.checked == true){
      skills = skills+this.value+" ";
    }
  })
}

let i = 0, j = 0;
const current = new Date().getFullYear()

for(i=1950;i<=current;i++){
  const option = document.createElement('option');
  option.text = i;
  years.options.add(option)
}

let arr = ["10 Equivalent","10+2 Equivalent","B.E./B.Tech.","M.E./M.Tech.","B.C.A.", "M.C.A.", "B.Sc (Computer Science)", "M.Sc (Computer Science)", "B.B.A","M.B.A","B.Com.","M.Com.","B.A. (Literature)", "M.A. (Literature)", "Others"];
for(j=0;j<arr.length;j++){
  let qualoption = document.createElement('option')
  qualoption.text = arr[j];
  qual.options.add(qualoption)
}

btn.disabled = true
declare.addEventListener('click',function(){
  if(this.checked){
    btn.disabled = false
  }
  else{
    btn.disabled = true
  }
})

const URL = 'https://kernelbackend.herokuapp.com/api/join';

loading.style.display = 'none'

btn.addEventListener('click',async (e)=>{
  e.preventDefault();
  
  
  form.style.display = 'none'
  loading.style.display = 'block'


  const data = {
    name: mname.value,
    email: email.value,
    year: years.value,
    qualification: qual.value,
    skills: skills
  }



  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const resp = await fetch(URL, options);
  const respData = await resp.json()
  if(respData.message){
    setTimeout(() => {
      form.style.display = 'flex'
      loading.style.display = 'none'
      window.alert(respData.message)
    }, 2000);
  }
  else{
    setTimeout(() => {
      form.style.display = 'flex'
      loading.style.display = 'none'
      window.alert(respData.error)
    }, 2000);
  }
})



console.log(years.value);