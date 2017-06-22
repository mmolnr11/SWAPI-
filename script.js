
window.onload = function() { 
        main('http://swapi.co/api/planets');
        document.getElementById("next").addEventListener("click", function(){
            var url= document.getElementById("next").getAttribute("class");
            var table = document.getElementById("mytable");
            debugger
            table.innerHTML=""
            
            //var list = document.getElementById("myList");
            //while (table.hasChildNodes()) {
                //table.removeChild(list.firstChild);
            //}
            main(url);   
 
        });
        document.getElementById("previous").addEventListener("click", function(){
            var url= document.getElementById("previous").getAttribute("class");
            
            if (url = "null") {
                
                url = "http://swapi.co/api/planets";
                alert("hulyegyerek nincs elotte oldal")
            
            }
            var table = document.getElementById("mytable");
            table.innerHTML=""
            main(url);   
 
        }); 
         document.getElementById("modalclosebutton").addEventListener("click", function(){
                
            var table = document.getElementById("modaltable");
            table.innerHTML=""  
});}


function main(url){
    var request = new XMLHttpRequest();
    
    request.open('GET', url, true);
    request.onload = function() {

        if (request.status >= 200 && request.status < 400) { // successful response
            var data = JSON.parse(request.responseText);
            
            var nextUrl = data.next;
            var prevUrl = data.previous;
            var nextbutton = document.getElementById("next");
            nextbutton.setAttribute("class", nextUrl);
            var prevbutton = document.getElementById("previous");
            prevbutton.setAttribute("class", prevUrl);

            
            
       
            for (var i = 0; i < 10; i++) { 
                //var arrayOfPlanets = [];

                var planetName = data['results'][i]["name"];
                var planetDiameter = data['results'][i]["diameter"];
                var planetClimate = data['results'][i]["climate"];
                var planetTerrain = data['results'][i]["terrain"];
                var waterPercentage = data['results'][i]["surface_water"];
                var population = data['results'][i]["population"];
            // arrayOfPlanets.push(planetName, planetDiameter,planetClimate, planetTerrain);
               

                var row = document.createElement("tr")
                row.setAttribute("id", i);
                var cell = document.createElement("td");
                var text = document.createTextNode(planetName);
                //x.appendChild(t);
                document.getElementById("mytable").appendChild(row);
                row.appendChild(cell);
                cell.appendChild(text);
                
                
                
            

                var cell = document.createElement("td");
                var text = document.createTextNode(planetDiameter);
                cell.appendChild(text);
                document.getElementById(i).appendChild(cell);

                var cell = document.createElement("td");
                var text = document.createTextNode(planetClimate);
                cell.appendChild(text);
                document.getElementById(i).appendChild(cell);
                

                var cell = document.createElement("td");
                var text = document.createTextNode(planetTerrain);
                cell.appendChild(text);
                document.getElementById(i).appendChild(cell);

                var cell = document.createElement("td");
                var text = document.createTextNode(waterPercentage);
                cell.appendChild(text);
                document.getElementById(i).appendChild(cell);

                var cell = document.createElement("td");
                var text = document.createTextNode(population);
                cell.appendChild(text);
                document.getElementById(i).appendChild(cell);

                
                var residents = data['results'][i]["residents"];
                var length = residents.length
                if (residents.length === 0){
                    
                    var cell = document.createElement("td");
                    var text = document.createTextNode("No known residents");
                    cell.appendChild(text);
                    document.getElementById(i).appendChild(cell);
                }   else {
                    // <button type="button" class="close" data-dismiss="modal">&times;</button>
                     //<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
                    var residentsButton = document.createElement("button");
                   // residentsButton.setAttribute("class", "" );                
                 // ezt nem adjuk at   residentsButton.setAttribute("modal", residents )
                    residentsButton.setAttribute("type", "button")
                    residentsButton.setAttribute("class", "residentsbutton btn btn-info btn-lg" )
                    residentsButton.setAttribute("data-toggle", "modal" )
                    residentsButton.setAttribute("data-target", "#myModal" )
                    residentsButton.setAttribute("adat", residents )

                    

                    var text = document.createTextNode(length + "residents");
                    residentsButton.appendChild(text)
                    document.getElementById(i).appendChild(residentsButton);

                    }            

                
                

                        
            }debugger
            var array = document.getElementsByClassName("residentsbutton");
            
            var myFunction = function() {

                var persons = this.getAttribute("adat");
                var allPersonsAsUrls = persons.split(",");
                //var listofnames = [];
                for (var UrlOfResident = 0; UrlOfResident < allPersonsAsUrls.length; UrlOfResident++) { 
                    
                    var request = new XMLHttpRequest();
                    var personsUrl = allPersonsAsUrls[UrlOfResident]
                    debugger
                    
                    request.open('GET', personsUrl, true);
                    request.onload = function() {

                        if (request.status >= 200 && request.status < 400) { // successful response
                            var infoOfPersons = JSON.parse(request.responseText);
                            var nameOfPerson = infoOfPersons["name"]
                           // listofnames.push(nameOfPerson)
                            var heightOfPerson = infoOfPersons["height"]
                            var hair_colorOfPerson = infoOfPersons["hair_color"]
                            var skin_colorOfPerson = infoOfPersons["skin_color"]
                            var eye_colorOfPerson = infoOfPersons["eye_color"]
                            var genderOfPerson = infoOfPersons["gender"]
                            
                            var modalrow = document.createElement("tr");
                            modalrow.setAttribute("id", "modalrow"+UrlOfResident)
                            var modalcell = document.createElement("td");
                            var text = document.createTextNode(nameOfPerson);
                            modalcell.appendChild(text);
                            modalrow.appendChild(modalcell);
                            debugger
                            document.getElementById("modaltable").appendChild(modalrow);

                            var modalcell = document.createElement("td");
                            var text = document.createTextNode(heightOfPerson);
                            modalcell.appendChild(text);
                            document.getElementById("modalrow"+UrlOfResident).appendChild(modalcell);

                            var modalcell = document.createElement("td");
                            var text = document.createTextNode(skin_colorOfPerson);
                            modalcell.appendChild(text);
                            document.getElementById("modalrow"+UrlOfResident).appendChild(modalcell);
                            
                            var modalcell = document.createElement("td");
                            var text = document.createTextNode(eye_colorOfPerson);
                            modalcell.appendChild(text);
                            document.getElementById("modalrow"+UrlOfResident).appendChild(modalcell);

                            var modalcell = document.createElement("td");
                            var text = document.createTextNode(genderOfPerson);
                            modalcell.appendChild(text);
                            document.getElementById("modalrow"+UrlOfResident).appendChild(modalcell);
                           
                        }

                    }
                    request.send();
                } 
                           
            }
            for (var i = 0; i < array.length; i++) {
                array[i].addEventListener('click', myFunction, false);
                debugger
            }
            
        }
    }

    request.send();
}
