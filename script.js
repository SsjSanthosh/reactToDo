"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var count = 1;

var ToDoList = function (_React$Component) {
    _inherits(ToDoList, _React$Component);

    function ToDoList(props) {
        _classCallCheck(this, ToDoList);

        var _this = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this, props));

        _this.state = {
            items: []
        };
        _this.appendList = _this.appendList.bind(_this);

        _this.removeItem = _this.removeItem.bind(_this);
        _this.editItem = _this.editItem.bind(_this);
        return _this;
    }

    _createClass(ToDoList, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "app" },
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(AddListComponent, {
                        appendList: this.appendList
                    })
                ),
                React.createElement(
                    "div",
                    { className: "container" },
                    this.state.items.length > 0 ? React.createElement(ListComponent, {
                        items: this.state.items,
                        removeItem: this.removeItem,
                        editItem: this.editItem
                    }) : ""
                )
            );
        }
    }, {
        key: "appendList",
        value: function appendList(item) {
            this.setState(function (oldState, props) {
                return {
                    items: oldState.items.concat(item)
                };
            });
        }
    }, {
        key: "removeItem",
        value: function removeItem(item) {
            var index = this.state.items.indexOf(item);
            this.state.items.splice(index, 1);
            var newState = this.state.items;
            this.setState(function () {
                return { items: newState };
            });
        }
    }, {
        key: "editItem",
        value: function editItem(item) {
            var _this2 = this;

            var index = this.state.items.indexOf(item.value);
            item.removeAttribute("disabled");

            item.placeholder = "type and hit enter to edit item";
            this.state.items[index] = "";
            item.value = "";
            console.log(this.state.items[index]);

            item.addEventListener("keypress", function (e) {

                var bstate = _this2.state.items;
                bstate[index] = "";
                bstate[index] += e.key;
                item.value = bstate[index];
                if (e.keyCode == 13) {
                    _this2.setState(function () {
                        return {
                            items: bstate
                        };
                    });
                }
            });
        }
    }]);

    return ToDoList;
}(React.Component);

var AddListComponent = function (_React$Component2) {
    _inherits(AddListComponent, _React$Component2);

    function AddListComponent(props) {
        _classCallCheck(this, AddListComponent);

        var _this3 = _possibleConstructorReturn(this, (AddListComponent.__proto__ || Object.getPrototypeOf(AddListComponent)).call(this, props));

        _this3.addItemHelper = _this3.addItemHelper.bind(_this3);

        return _this3;
    }

    _createClass(AddListComponent, [{
        key: "addItemHelper",
        value: function addItemHelper(e) {
            e.preventDefault();
            var item = e.target[0].value;

            if (item.trim() != "") {
                this.props.appendList(item);
            } else {
                e.placeholder = "Please enter valid items";
            }

            e.target[0].value = "";
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "topDiv card" },
                React.createElement(
                    "h1",
                    null,
                    "To-do List"
                ),
                React.createElement(
                    "h3",
                    null,
                    "Add an item to your list!"
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.addItemHelper },
                    React.createElement("input", { name: "item", type: "text", placeholder: "Enter list item" }),
                    React.createElement(
                        "button",
                        { id: "addItem", type: "submit" },
                        "Add "
                    )
                )
            );
        }
        // componentDidMount(){
        //     const button = document.getElementById("addItem");
        //     button.addEventListener("onClick",appendList);
        // }

    }]);

    return AddListComponent;
}(React.Component);

var ListComponent = function (_React$Component3) {
    _inherits(ListComponent, _React$Component3);

    function ListComponent() {
        _classCallCheck(this, ListComponent);

        return _possibleConstructorReturn(this, (ListComponent.__proto__ || Object.getPrototypeOf(ListComponent)).apply(this, arguments));
    }

    _createClass(ListComponent, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "bottomDiv card" },
                React.createElement(
                    "h1",
                    null,
                    "Your list"
                ),
                React.createElement(List, { items: this.props.items,
                    removeItem: this.props.removeItem,
                    editItem: this.props.editItem
                })
            );
        }
    }]);

    return ListComponent;
}(React.Component);

var List = function (_React$Component4) {
    _inherits(List, _React$Component4);

    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "div",
                null,
                this.props.items.map(function (item) {
                    return React.createElement(ListItem, {
                        key: item,
                        item: item,
                        removeItem: _this6.props.removeItem,
                        editItem: _this6.props.editItem
                    });
                })
            );
        }
    }]);

    return List;
}(React.Component);

var ListItem = function (_React$Component5) {
    _inherits(ListItem, _React$Component5);

    function ListItem(props) {
        _classCallCheck(this, ListItem);

        var _this7 = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

        _this7.editItems = _this7.editItems.bind(_this7);

        _this7.deleteItem = _this7.deleteItem.bind(_this7);
        _this7.checkItem = _this7.checkItem.bind(_this7);
        return _this7;
    }

    _createClass(ListItem, [{
        key: "deleteItem",
        value: function deleteItem(e) {
            var item = e.target.parentElement.parentElement.parentElement.firstChild.value;
            this.props.removeItem(item);
        }
    }, {
        key: "editItems",
        value: function editItems(e) {
            e.preventDefault();
            e.persist();
            var item = e.target.parentElement.parentElement.parentElement.firstChild;
            this.props.editItem(item);
        }
    }, {
        key: "checkItem",
        value: function checkItem(e) {
            e.preventDefault();
            e.persist();
            var item = e.target.parentElement.parentElement.parentElement.firstChild;
            item.classList.toggle("done");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "listItems" },
                React.createElement("input", { type: "text", value: this.props.item, disabled: true, className: "" }),
                React.createElement(
                    "span",
                    { className: "buttons" },
                    React.createElement(
                        "a",
                        { href: "#", onClick: this.editItems },
                        React.createElement("i", { className: "far fa-lg fa-edit" })
                    ),
                    React.createElement(
                        "a",
                        { href: "#", onClick: this.deleteItem },
                        React.createElement("i", { className: "far fa-trash-alt fa-lg" })
                    ),
                    React.createElement(
                        "a",
                        { href: "#", onClick: this.checkItem },
                        React.createElement("i", { className: "far fa-check-square fa-lg" })
                    )
                )
            );
        }
    }]);

    return ListItem;
}(React.Component);

var app = document.getElementById("app");
ReactDOM.render(React.createElement(ToDoList, null), app);
