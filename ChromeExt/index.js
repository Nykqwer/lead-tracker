
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}  

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads); 
    });
 
})

function render(leads) {
    let itemList = "";
    
    for(let i = 0; i< leads.length; i++){
    
      itemList +=`
      <li>
       <a href='${leads[i]}' target='_blank'>
      ${leads[i]}
        </a>
       </li>`
    }
    
    ulEl.innerHTML = itemList;
}

deleteBtn.addEventListener("dblclick", function(){
    ulEl.innerHTML= "";
    myLeads = [];
    localStorage.clear();
    render(myLeads);
 
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    //clear
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);

})


