

let count=1;

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items:[]
        }
        this.appendList = this.appendList.bind(this);
    
        this.removeItem = this.removeItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }
    render(){
        return(
            <div className = "app">
                <div className = "container">
                <AddListComponent 
                    appendList = {this.appendList}
                />
                </div>
               <div className = "container">
                    {this.state.items.length>0?<ListComponent 
                        items = {this.state.items}
                        removeItem = {this.removeItem}
                        editItem = {this.editItem}
                    /> : ""}
               </div>
            </div>
        )
    }
    appendList(item){
        this.setState((oldState,props) => ( {
            items:oldState.items.concat(item)
        }))
    }

    removeItem(item){
        const index = this.state.items.indexOf(item);
        this.state.items.splice(index,1);
        const newState = this.state.items;
        this.setState(()=>({items:newState})
        )
    }

    editItem(item){
        let index = this.state.items.indexOf(item.value);
        item.removeAttribute("disabled");
        
        item.placeholder = "type and hit enter to edit item"
        this.state.items[index]="";
        item.value="";
        console.log(this.state.items[index]);
       
        item.addEventListener("keypress",(e)=>{
            
            const bstate = this.state.items;
            bstate[index]=""
            bstate[index]+=e.key;
            item.value = bstate[index];
            if(e.keyCode==13){
                this.setState(()=>({
                    items:bstate
                }))
            }
        })
        
    }
}


class AddListComponent extends React.Component{
    
    constructor(props){
        super(props);
        this.addItemHelper=this.addItemHelper.bind(this);
        
    }
    addItemHelper(e){
        e.preventDefault();
        const item = e.target[0].value;
        
        if(item.trim()!=""){
            this.props.appendList(item);
        }
        else{
            e.placeholder="Please enter valid items"
        }
        
        e.target[0].value = "";
    }
    render(){
        return (
        <div className = "topDiv card">
            <h1>To-do List</h1>
            <h3>Add an item to your list!</h3>
            <form onSubmit = {this.addItemHelper}>
            <input name = "item" type = "text" placeholder="Enter list item"></input>
            <button id = "addItem" type = "submit" >Add </button>
            </form>
        </div>
        )
    }
    // componentDidMount(){
    //     const button = document.getElementById("addItem");
    //     button.addEventListener("onClick",appendList);
    // }

}


class ListComponent extends React.Component{
    render(){
        return(
            <div className="bottomDiv card">
                <h1>Your list</h1>
                
                <List items = {this.props.items}
                    removeItem = {this.props.removeItem}
                    editItem = {this.props.editItem}
                />
            </div>
        )
    }
}

class List extends React.Component{
    render(){
       return (
           <div>
               {
                   this.props.items.map((item)=>{
                       return <ListItem
                           key = {item}
                           item = {item}
                           removeItem = {this.props.removeItem}
                           editItem = {this.props.editItem}
                       />
                   })
               }
           </div>
       )
    }
}

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.editItems = this.editItems.bind(this);
     
        this.deleteItem = this.deleteItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
    }
    deleteItem(e){
        const item = e.target.parentElement.parentElement.parentElement.firstChild.value;
        this.props.removeItem(item);
    }
   
    editItems(e){
        e.preventDefault();
        e.persist();
        const item = e.target.parentElement.parentElement.parentElement.firstChild;
        this.props.editItem(item);
    }


    checkItem(e){
        e.preventDefault();
        e.persist();
        const item = e.target.parentElement.parentElement.parentElement.firstChild;
        item.classList.toggle("done");
    }
    render(){
        return (
            <div className = "listItems">
               <input type = "text" value={this.props.item} disabled={true} className = ""></input>
               <span className = "buttons">
                   <a href="#" onClick = {this.editItems}><i className="far fa-lg fa-edit"></i></a>
                   <a href="#" onClick = {this.deleteItem}><i className="far fa-trash-alt fa-lg"></i></a>
                   <a href="#" onClick = {this.checkItem}><i className="far fa-check-square fa-lg"></i></a>
               </span>
            </div>
        )
    }
}






const app = document.getElementById("app");
ReactDOM.render(<ToDoList />,app);