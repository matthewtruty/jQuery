// EXAMPLE GLOBAL USAGE

/*
<script type="text/javascript" src="/scripts/jquery.auto-address.js"></script>
    <script>
        $(function () {
            $('.geoaddress').autoAddress()
        });
</script>
*/

// PLUGIN CODE WITH EXAMPLES

$.autoAddress = function (element, options) {

    var getInput = function (name) {
        var el = $(name, element)[0];
        if (el !== undefined && isRad(el)) {
            return el;
        }

        if (!$(el).is('input')) {
            el = $(name + ' input', element)[0];
        }
        return el;
    }

    // plugin's default options
    // this is private property and is  accessible only from inside the plugin
    // for demonstration purposes only - set your own defaults!
    var defaults = {

        autoComplete: null,
        placeHolderText: 'Enter your Address',
        autoCompleteTextBox: getInput('.autocomplete'),
        componentForm: {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            country: 'long_name',
            administrative_area_level_1: 'long_name',
            postal_code: 'short_name'
        }

        // if your plugin is event-driven, you may provide callback capabilities
        // for its events. execute these functions before or after events of your 
        // plugin, so that users may customize those particular events without 
        // changing the plugin's code

    }

    // to avoid confusions, use "plugin" to reference the 
    // current instance of the object
    var plugin = this;

    // this will hold the merged default, and user-provided options
    // plugin's properties will be available through this object like:
    // plugin.settings.propertyName from inside the plugin or
    // element.data('pluginName').settings.propertyName from outside the plugin, 
    // where "element" is the element the plugin is attached to;
    plugin.settings = {}

    var $element = $(element), // reference to the jQuery version of DOM element
         element = element;    // reference to the actual DOM element

    // the "constructor" method that gets called when the object is created
    plugin.init = function () {
        // the plugin's final properties are the merged default and 
        // user-provided options (if any)
        plugin.settings = $.extend({}, defaults, options);


        // code goes here
        // example code showing how to work with the settings.
        // example shown is from a geolocation address lookup implementation
        // for demonstration purposes only - remove it!

        //BEGIN DEMONSTRATION
        plugin.settings.autoComplete = new google.maps.places.Autocomplete(
          plugin.settings.autoCompleteTextBox,
          { types: ['geocode'] });

        var placeholder = $(plugin.settings.autoCompleteTextBox).attr('placeholder');
        if (typeof (placeholder) === 'undefined') {
            $(plugin.settings.autoCompleteTextBox).attr('placeholder', plugin.settings.placeholderText)
        }
        plugin.settings.autoComplete.addListener('place_changed', fillInAddress);
        // END OF DEMONSTRATION

    }

    // public methods
    // these methods can be called like:
    // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
    // element.data('pluginName').publicMethod(arg1, arg2, ... argn) from outside 
    // the plugin, where "element" is the element the plugin is attached to;

    // a public method. for demonstration purposes only - remove it!
    plugin.foo_public_method = function () {

        // code goes here

    }

    // private methods
    // these methods can be called only from inside the plugin like:
    // methodName(arg1, arg2, ... argn)



    // a private method. for demonstration purposes only - remove it!
    var geolocate = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                plugin.settings.autoComplete.setBounds(circle.getBounds());
            });
        }
    }


    // fire up the plugin!
    // call the "constructor" method
    //plugin.settings.autoCompleteTextBox = createAutocompleteTextBox();
    plugin.init();

}

// add the plugin to the jQuery.fn object
$.fn.autoAddress = function (options) {

    // iterate through the DOM elements we are attaching the plugin to
    return this.each(function () {

        // if plugin has not already been attached to the element
        if (undefined == $(this).data('autoAddress')) {

            // create a new instance of the plugin
            // pass the DOM element and the user-provided options as arguments
            var plugin = new $.autoAddress(this, options);

            // in the jQuery version of the element
            // store a reference to the plugin object
            // you can later access the plugin and its methods and properties like
            // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
            // element.data('pluginName').settings.propertyName
            $(this).data('autoAddress', plugin);
        }
    });
}