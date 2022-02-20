fetch("products.json")
  .then(response => response.json())
  .then(json => {
    append_json (json);
    if (localStorage.length == 0){
        append_to_localstorage(json);
    }
  })

  function append_json(data){
    let table = document.getElementById('table');
    if (localStorage.length != 0){
        alert('loading the cars from localstorage')
        for (let i = 0; i < localStorage.length; i++) {
            obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
            let tr = document.createElement('tr');
            tr.setAttribute("id", obj.id);
            tr.innerHTML = '<td>' + obj.id + '</td>' +
            '<td>' + obj.name + '</td>' +
            '<td>' + obj.price + '</td>' +
            '<td>' + obj.stock + '</td>' +
            '<td>' + '<button onclick="increase_stock(this.id)" id = '+ obj.id + '>Increase stock</button>' +
            '<button onclick="decrease_stock(this.id)" id = '+ obj.id +'>Decrease stock</button></td>' +
            '<td>' + '<button onclick="remove_car(this.id)" id = '+obj.id+'>Remove this item</button</td>'; 
            table.appendChild(tr);
        }
    }
    else {
        alert('loading the cars from json file')
    data.forEach(function(object) {
        let tr = document.createElement('tr') ;
        tr.setAttribute("id", object.id);
        tr.innerHTML = '<td>' + object.id + '</td>' +
        '<td>' + object.name + '</td>' +
        '<td>' + object.price + '</td>' +
        '<td>' + object.stock + '</td>' +
        '<td>' + '<button onclick="increase_stock(this.id)" id = '+ object.id + '>Increase stock</button>' +
        '<button onclick="decrease_stock(this.id)" id = '+ object.id +'>Decrease stock</button>' + 
        '<td>' + '<button onclick="remove_car(this.id)" id = '+object.id+'>Remove this item</button</td>';
        table.appendChild(tr);
        });
    }
}

function append_to_localstorage(data){
    data.forEach(function(object) {
        localStorage.setItem(object.id, JSON.stringify(object))
    });
}

function increase_stock(button_id){
    current_stock = parseInt(document.getElementById("table").rows[button_id].cells[3].innerHTML)
    document.getElementById("table").rows[button_id].cells[3].innerHTML = current_stock + 1
    car_to_update = JSON.parse(localStorage.getItem(button_id))
    car_to_update.stock = current_stock + 1
    localStorage.setItem(button_id, JSON.stringify(car_to_update))
}

function decrease_stock(button_id){
    current_stock = parseInt(document.getElementById("table").rows[button_id].cells[3].innerHTML)
    document.getElementById("table").rows[button_id].cells[3].innerHTML = current_stock - 1
    car_to_update = JSON.parse(localStorage.getItem(button_id))
    car_to_update.stock = current_stock - 1
    localStorage.setItem(button_id, JSON.stringify(car_to_update))
}

function remove_car(button_id){
    localStorage.removeItem(button_id);
    document.getElementById(button_id).remove();
}

// function increase_stock()
// {
//     fetch("products.json", {
//         method: "POST",
//         mode: 'no-cors',
//         body: JSON.stringify({
//             id: 4,
//             name: "foo",
//             price: 90,
//             stock: 1
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
//     .then(response => response.json())
//     .then(json => console.log(json));
// }

