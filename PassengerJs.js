var ViewModel = function() {
        var self = this;
    ko.validation.rules['text'] = {
       validator: function (val, params) {
              var regex = /([A-Za-z])$/;
              if (regex.test(val)) {
              return true;
       }
       },
           message: 'Only Alphabets Allowed'
       };
    ko.validation.rules['passenger'] = {
            validator: function (val, params) {
           var regex = /([0-9])$/;
            if (regex.test(val)) {
            return true;
        }
       },
            message: 'Only Number Allowed'
       };

    ko.validation.rules['Phone'] = {
        validator: function (val, params) {
            var regex = /([789]{1}[0-9]{9})$/;
            if (regex.test(val)) {
                if(val.length === 10)
                    return true;
            }
        },
        message: 'Enter Valid Mobile Number'
        };
    
    ko.validation.registerExtenders();

    self.firstName=ko.observable().extend({required:true,text:true});
    self.lastName=ko.observable().extend({required:true,text:true});
    self.email=ko.observable().extend({required:true,email:true});
    self.phone=ko.observable().extend({required:true,Phone:true});
    self.passenger=ko.observable().extend({required:true});
    self.Country=ko.observable().extend({text:true});
    self.Branch=ko.observable().extend({text:true});

    self.visaType = ko.observable();
    self.visaSubType = ko.observable();

    self.isTourist = ko.observable("tourist");
    self.other = ko.observable(false);
    self.tourist = ko.observable(true);
    self.business = ko.observable(false);
    self.touristVisaSubType = ko.observable("6");
    self.businessVisaSubType = ko.observable("1");
    self.otherVisaSubType = ko.observable("4");
    
    self.isTourist.ForEditing = ko.computed({
        read: function() {
            return self.isTourist().toString();  
        },
        write: function(newValue) {

          
            if(newValue === "business"){
                self.tourist(false);
                self.other(false);
                self.business(true);
                
                
                self.touristVisaSubType("6");
                self.otherVisaSubType("4");
               
                
                
            }else if(newValue === "tourist"){
                self.business(false);  
                self.other(false); 
                self.tourist(true);
                self.businessVisaSubType("1");
                self.otherVisaSubType("4");
              
                
            }else{
                self.tourist(false);
                self.business(false);
                self.other(true);
                self.touristVisaSubType("6");
                self.businessVisaSubType("1");
               
            }
            self.isTourist(newValue );
            
        }
              
    });

    
    self.visaSubType(self.businessVisaSubType());
    self.passengerList= ko.observableArray([]);

    function getpassengerList() {
      var customer = JSON.parse(localStorage.getItem("passengerList"));
     
      self.passengerList(customer);
    }

  
    self.addPassenger=function addPassenger()
    {
        self.errors = ko.validation.group(this, { deep: true, observable: false });
        
        if (self.errors().length === 0) {
		

                var customer = JSON.parse(localStorage.getItem("passengerList"));

                if (customer === null || customer === undefined) {
                    customer = []
                }
                
            if( self.isTourist() === "business"){
                self.visaSubType(self.businessVisaSubType());
            }else if(self.isTourist() === "tourist"){
                self.visaSubType(self.touristVisaSubType());
            }else{
                self.visaSubType(self.otherVisaSubType())
            }

            console.log(self.businessVisaSubType());
                var user ={
                    firstName:self.firstName(),
                    lastName:self.lastName(),
                    email: self.email(),
                    Country : self.Country(),
                    Branch : self.Branch(),
                    phone : self.phone(),
                    passenger :self.passenger(),
                    isTourist:self.isTourist(),
                    visaSubType: self.visaSubType(),
                } 
               
                customer.push(user);
                
                localStorage.setItem("passengerList", JSON.stringify(customer));
                window.location.reload(true);
            }
            else{
                alert("please chek your submission");
            }
        getpassengerList();
        
    }
    
    self.deleteCustomer = function (customer1,event) {
       
        var customer = JSON.parse(localStorage.getItem("passengerList"));
        
        var context = ko.contextFor(event.target);
        let index=context.$index();
        customer.splice(index,1);
        alert('Passenger Deleted Successfully');
        localStorage.setItem("passengerList", JSON.stringify(customer))
        getpassengerList();
    }
    getpassengerList();
}; 
 ko.applyBindings(new ViewModel());