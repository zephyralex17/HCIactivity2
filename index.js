var config = {
    apiKey: "AIzaSyDPdGFpaR3AmKKsBk9S-MB2cgkiHj_8eSQ",
    authDomain: "crud-879b2.firebaseapp.com",
    databaseURL: "https://crud-879b2.firebaseio.com",
    projectId: "crud-879b2",
    storageBucket: "crud-879b2.appspot.com",
    messagingSenderId: "986065811393"
  };
  firebase.initializeApp(config);


  document.getElementById("form").addEventListener("submit",(e)=>{
      var task = document.getElementById("task").value;
      var description = document.getElementById("description").value;
      var email = document.getElementById("email").value;
      var cnumber = document.getElementById("cnumber").value;
      var btype = document.getElementById("btype").value;
      e.preventDefault();
      createTask(task,description,email,cnumber,btype);
      form.reset();

  });

function  createTask(taskName,description,email,cnumber,btype){


var task={
    id:counter,
    task: taskName,
    description:description,
    email:email,
    cnumber:cnumber,
    btype:btype
}
let db= firebase.database().ref("task/"+counter);
db.set(task);
document.getElementById("cardSection").innerHTML='';
readTask();
}

function readTask(){
    var task= firebase.database().ref("task/");
    task.on("child_added",function(data){
    var taskValue= data.val();
  
    document.getElementById("cardSection").innerHTML+=`
     <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">${taskValue.id}</h5>
            <p class="card-text">${taskValue.description}, ${taskValue.task} </p>
            <p class="card-text">${taskValue.email}</p>
            <p class="card-text">${taskValue.cnumber}</p>
            <p class="card-text">${taskValue.btype}</p>
            <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(${taskValue.id}, '${taskValue.task}','${taskValue.description}','${taskValue.email}','${taskValue.cnumber}','${taskValue.btype}')"><i class="fas fa-pen-square"></i>Edit Task</button>
            <button type="submit" class="btn btn-danger" onclick="deleteTask('${taskValue.id}')"><i class="fas fa-trash"></i>Delete Task</button> 
        </div>
     </div>
    
    
    `
    });
}

function reset(){

    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4 " id="form">
                   
    <div class="form-group">
        <label>Firstname</label>
        <input type="text" class="form-control" id="task" placeholder="Enter first name">
    </div>

    <div class="form-group">
        <label>Lastname</label>
        <input type="text" class="form-control" id="description" placeholder="Enter last name">
    </div>

    <div class="form-group">
        <label>Email Address</label>
        <input type="text" class="form-control" id="email" placeholder="Enter email address">
    </div>

    <div class="form-group">
        <label>Program</label>
        <input type="text" class="form-control" id="cnumber" placeholder="Enter Program">
    </div>

    <div class="form-group">
    <label>Select Gender</label>
        <select id="btype">
            <option value="Male" selected="selected">Male</option>
            <option value="Female">Female</option>
            <option value="LGBTQ">LGBTQ</option>
        </select>
    </div>

    <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i>Add Task</button>
    <button style="display: none" id="button2" class="btn btn-success">Update Task</button>
    <button style="display: none" id="button3" class="btn btn-danger">Cancel</button> 
</form>
    `;

    document.getElementById("form").addEventListener("submit",(e)=>{
        var task = document.getElementById("task").value;
        var description = document.getElementById("description").value;
        var email = document.getElementById("email").value;
        var cnumber = document.getElementById("cnumber").value;
        var btype = document.getElementById("btype").value;
        e.preventDefault();
        createTask(task,description,email,cnumber,btype);
        form.reset();
    });
}

function updateTask(id,name,description,email,cnumber,btype){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4 " id="form2">
                   
    <div class="form-group">
        <label>Firstname</label>
        <input type="text" class="form-control" id="task" placeholder="Enter first name">
    </div>

    <div class="form-group">
        <label>Lastname</label>
        <input type="text" class="form-control" id="description" placeholder="Enter last name">
    </div>

    <div class="form-group">
        <label>Email Address</label>
        <input type="text" class="form-control" id="email" placeholder="Enter email address">
    </div>

    <div class="form-group">
        <label>Program</label>
        <input type="text" class="form-control" id="cnumber" placeholder="Enter Program">
    </div>

    <div class="form-group">
    <label>Select Gender</label>
        <select id="btype">
         <option value="Male" selected="selected">Male</option>
         <option value="Female">Female</option>
         <option value="LGBTQ">LGBTQ</option>
        </select>
    </div>

    <button style="display: none" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i>Add Task</button>
    <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync-alt"></i>Update Task</button>
    <button style="display: inline-block" id="button3" class="btn btn-danger"><i class="fas fa-ban"></i>Cancel</button> 
</form>
    `;
    document.getElementById("form2").addEventListener("submit",(e)=>{
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click",(e)=>{
        reset();
    });
    document.getElementById("button2").addEventListener("click",(e)=>{
        updateTask2(id, document.getElementById("task").value, document.getElementById("description").value, document.getElementById("email").value, document.getElementById("cnumber").value, document.getElementById("btype").value);
    });
    document.getElementById("task").value=name;
    document.getElementById("description").value=description;
    document.getElementById("email").value=email;
    document.getElementById("cnumber").value=cnumber;
    document.getElementById("btype").value=btype;
}

function updateTask2(id,name,description,email,cnumber,btype){
    var taskUpdated={
        task:name,
        id:id,
        description:description,
        email:email,
        cnumber:cnumber,
        btype:btype
    }
    let db= firebase.database().ref("task/"+id);
    db.set(taskUpdated);
    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
}

function deleteTask(id){
    var task= firebase.database().ref("task/"+id);
    task.remove();
    reset();
    document.getElementById("cardSection").innerHTML='';
    readTask();
}
