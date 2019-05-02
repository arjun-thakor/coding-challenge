/*
    This file container code for fetching and display data to the users.
    It includes javascript and jquery code.
*/

//Using jQuery methods, when window loads or refresh => do something
$(document).ready(() => {
	$('#searchByCity').focus();                         // adding focus to the input field when page is load
    $('#searchForm').on('click', (e) => {               // Button clicked and function get called getRestaurants()
		let city_name = $('#searchByCity').val();       // getting input value and storing in local variable
		let user_search_city = city_name.toUpperCase(); // transformming text value to uppercase
		getRestaurants(user_search_city);               // calling getRestaurants() function
		isEmpty();                                      // calling isEmpty() function to checked is form submitted empty
		e.preventDefault();                             // event handler to prevent uncertain events
	});
});

 function getRestaurants(user_search_city){             // implementing getRestaurants() function
    axios.get('http://opentable.herokuapp.com/api/restaurants?city=' + user_search_city) // Axios to handle http request
      .then((response) => {                                                               // returning promise
          console.log(response);                                                        // logging data to the console
        let rating = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];           // var for rating
        let r = response.data.restaurants;                                              //getting length of json array
        let num_of_restaurants = r.length;
        let message = document.getElementById('message');                               // getting html element for displaying info and error message
        let data_of_restaurants = document.getElementById('Restaurant_data_list');      // getting html element for processing and displaying data
        let output = '';                                                                // defining var for writing result
		let cuisines = ['Sashimi', 'Yakitori', 'Udon', 'Sushi', 'Barbecue', ' Spanish', 'Italian', 'African', 'Jamaican', 'Indian', 'Asian']; // array for cuisuines for restaurants
        message.innerHTML = 'Hey there, We found ' + num_of_restaurants + ' restaurants in ' + user_search_city + '.';  // display message to user that __ no of result found ___ city.
		if(num_of_restaurants == 0){                                // display message to user if no restaurants available for searched value
			message.innerHTML = 'Sorry , nothing found.';           // writing mesage to user
            message.style.alignSelf = 'center';                     // adding some style
            message.className = 'text-muted display-3 text-center';
            data_of_restaurants.innerHTML = '';
        } else{                                                    // creating table view for data
            message.className = 'text-dark h2 text-center pb-4';   
            output +=`
                <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Price</th>
						<th scope="col">Cuisine</th>
						<th scope="col">Rating</th>
                    </tr>
                </thead>
                <tbody>
            `;
            for(let i = 0; i < r.length; i++){                      // iterating through the json array and getting restaurant data
            output += `
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${r[i].name}</td>
                        <td>${r[i].address} , ${r[i].city} ${r[i].state} ${r[i].country}</td>
                        <td>${r[i].price}</td>
						<td>${cuisines[Math.floor(Math.random() * cuisines.length)]}</td>
						<td>${rating[Math.floor(Math.random() * rating.length)]}</td>
                    </tr>
            `;
            }                                                       // ending the table tag
            output += `                                             
                </tbody>
            </table>
            `;
            data_of_restaurants.innerHTML = output;                 // writting the output to html element to display on screen 
        }
    })
	.catch((error) => {                                             // catching and logging error if occurs 
		console.log(error);
	});
  }
  
  function isEmpty() {                                              // function to checked if form is submitted with no value
	var inpObj = document.getElementById("searchByCity");
	if (!inpObj.checkValidity()) {
		document.getElementById("message").innerHTML = `
			<div class="alert alert-danger" role="alert">
				Please enter a city name.
		</div>
		`;
	}	
} 