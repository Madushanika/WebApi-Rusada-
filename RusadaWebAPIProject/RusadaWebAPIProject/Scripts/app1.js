


var ViewModelAircraftSighting = function () {

    var selfSighting = this;
    selfSighting.SightingId = ko.observable();
    //selfSighting.Make = ko.observable();
    selfSighting.Make = ko.observable();

    selfSighting.Model = ko.observable();
    selfSighting.Registration = ko.observable();
    selfSighting.Location = ko.observable();
    selfSighting.Date_and_Time = ko.observable();
    selfSighting.photo = ko.observable();
    selfSighting.aircraftSightingList = ko.observableArray([]);


    img.onchange = evt => {
        const [file] = img.files
        if (file) {
            blah.src = URL.createObjectURL(file)
        }
    }


 

    var AircraftSightingUri = '/api/AircraftSightings/';


    function ajaxFunction(uri, method, data) {

        //self.errorMessage('');

        return $.ajax({

            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null

        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert('Error : ' + errorThrown);
        });
    }



    //filter Data 
    selfSighting.filter = ko.observable();
    selfSighting.places = ko.observableArray([selfSighting.Make, selfSighting.Model, selfSighting.Registration]);

    selfSighting.visibleAircraftSighting = ko.computed(function () {
        return selfSighting.aircraftSightingList().filter(function (aircraftSighting) {

            if (!selfSighting.filter() || aircraftSighting.Make.toLowerCase().indexOf(selfSighting.filter().toLowerCase()) !== -1
                || aircraftSighting.Model.toLowerCase().indexOf(selfSighting.filter().toLowerCase()) !== -1
                || aircraftSighting.Registration.toLowerCase().indexOf(selfSighting.filter().toLowerCase()) !== -1
            )
                return aircraftSighting;
        });
    }, selfSighting);







    // Clear Fields
    selfSighting.clearFieldsAircraftSighting = function clearFieldsAircraftSighting() {
        selfSighting.Make('');
        selfSighting.Model('');
        selfSighting.Registration('');
        selfSighting.Location('');
        selfSighting.Date_and_Time('');
        selfSighting.photo('');
    }




    //Add new AircraftSighting
    selfSighting.addNewAircraftSighting = function addNewAircraftSighting(newAircraftSighting) {

        var AircraftSightingObject = {
            SightingId: selfSighting.SightingId(),
            Make: selfSighting.Make(),
            Model: selfSighting.Model(),
            Registration: selfSighting.Registration(),
            Location: selfSighting.Location(),
            Date_and_Time: selfSighting.Date_and_Time(),
            photo: selfSighting.photo(),
        };
        ajaxFunction(AircraftSightingUri, 'POST', AircraftSightingObject).done(function () {

            selfSighting.clearFieldsAircraftSighting();
            alert('AircraftSighting Added Successfully !');
            getAircraftSightingList()
        });
    }




    //Get AircraftSighting List
    function getAircraftSightingList() {
        $("div.loadingZone").show();
        ajaxFunction(AircraftSightingUri, 'GET').done(function (data) {
            $("div.loadingZone").hide();
            selfSighting.aircraftSightingList(data);
        });

    }




    //Get Detail AircraftSighting
    selfSighting.detailAircraftSighting = function (selectedAircraftSighting) {

        selfSighting.SightingId(selectedAircraftSighting.SightingId);
        selfSighting.Make(selectedAircraftSighting.Make);
        selfSighting.Model(selectedAircraftSighting.Model);
        selfSighting.Registration(selectedAircraftSighting.Registration);
        selfSighting.Location(selectedAircraftSighting.Location);
        selfSighting.Date_and_Time(selectedAircraftSighting.Date_and_Time);
        selfSighting.photo(selectedAircraftSighting.photo);

        $('#SaveAircraftSighting').hide();
        $('#ClearAircraftSighting').hide();

        $('#UpdateAircraftSighting').show();
        $('#CancelAircraftSighting').show();

    };





    selfSighting.cancelAircraftSighting = function () {

        selfSighting.clearFieldsAircraftSighting();

        $('#SaveAircraftSighting').show();
        $('#ClearAircraftSighting').show();

        $('#UpdateAircraftSighting').hide();
        $('#CancelAircraftSighting').hide();
    }


  



    //Update AircraftSighting
    selfSighting.updateAircraftSighting = function () {

        var AircraftSightingObject = {
            SightingId: selfSighting.SightingId(),
            Make: selfSighting.Make(),
            Model: selfSighting.Model(),
            Registration: selfSighting.Registration(),
            Location: selfSighting.Location(),
            Date_and_Time: selfSighting.Date_and_Time(),
            photo: selfSighting.photo()
        };

        ajaxFunction(AircraftSightingUri + selfSighting.SightingId(), 'PUT', AircraftSightingObject).done(function () {
            alert('AircraftSighting Updated Successfully !');
            getAircraftSightingList();
            selfSighting.cancelAircraftSighting();
        });
    }





    //Delete AircraftSighting
    selfSighting.deleteAircraftSighting = function (aircraftSighting) {

        ajaxFunction(AircraftSightingUri + aircraftSighting.SightingId, 'DELETE').done(function () {

            alert('AircraftSighting Deleted Successfully');
            getAircraftSightingList();
        })

    }




    ko.bindingHandlers.fileUpload = {
        init: function (element, valueAccessor) {
            $(element).change(function () {
                valueAccessor()(element.files[0]);
            });
        },
        update: function (element, valueAccessor) {
            if (ko.unwrap(valueAccessor()) === null) {
                $(element).wrap('<form>').closest('form').get(0).reset();
                $(element).unwrap();
            }
        }
    }


    function showPreview(event) {
        if (event.target.files.length > 0) {
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            preview.style.display = "block";
        }
    }


    getAircraftSightingList();




};




ko.applyBindings(new ViewModelAircraftSighting());

