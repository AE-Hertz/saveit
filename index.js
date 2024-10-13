
let myLeads = []
let inputEl = document.getElementById("input-el");
let inputBtn = document.getElementById("input-btn");
let tabBtn = document.getElementById("tab-btn");
const ulEL = document.getElementById("unordered-list");
const deleteBtn  = document.getElementById("delete-btn");
const deleteMsg = document.getElementById("delete-msg");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage ;
    render(myLeads);
}


tabBtn.addEventListener("click", ()=> {
    //console.log(tab[0].URL);
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads) {
    let listItem = "" ;
    for(let i=0 ; i<leads.length ; i++ ){
        //console.log(myLeads);
        //listItem += "<li><a target='_blank' href='#'>" + myLeads[i] + "</a></li>";
        listItem += `
        <li>
                <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                </a>    
        </li>
        `;
    }
    ulEL.innerHTML = listItem ;
};

//deleting
deleteBtn.addEventListener("click", () => {
    deleteMsg.style.display = "block";
    setTimeout(() => {
        deleteMsg.style.display = "none";
    }, 2000);
});

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [] ;
    render(myLeads);
});

// displaying
inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value);
    //console.log(myLeads);
    inputEl.value = "" ;
    // saving in localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    //console.log(localStorage.getItem("myLeads"))
    render(myLeads);
});

