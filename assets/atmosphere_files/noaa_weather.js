function noaa_weather(location){

  var lat = null;
  var lng = null;
  var city = null;
  var state = null;
  var loc = location || null;

  if (loc === null){
    lat = readCookie('noaa_weather_lat');
    lng = readCookie('noaa_weather_lng');
    city = readCookie('noaa_weather_city');
    state =  readCookie('noaa_weather_state');
    if (lat === null && lng === null && city ===null && state === null ){
      return false;
    }
  }
  else{
    // split Name into City, State or something close
    citystate = loc.name.split(',',4);
    var isZip = jQuery.isNumeric(citystate[0]);
    city = isZip && citystate.length > 1 ? citystate[1] : citystate[0];
    state = citystate.length > 1 ? (isZip ? citystate[2] : citystate[1]) : '';

    initial = noaa_state_conversion(state.trim());
    second = typeof citystate[2] != 'undefined' ? (isZip && typeof citystate[3] != 'undefined' ? noaa_state_conversion(citystate[3].trim()) :  noaa_state_conversion(citystate[2].trim())) : null;
    state = (typeof initial != 'undefined')? initial: (typeof second != 'undefined')? second : null;
    state = state ? state : '';//so no state prints, because any value here, null, false, etc is printed as a string

    // get the lat and lon
    lat = loc.feature['geometry']['y'];
    lng = loc.feature['geometry']['x'];

    createCookie('noaa_weather_lat', lat, 7);
    createCookie('noaa_weather_lng', lng, 7);
    createCookie('noaa_weather_city', city, 7);
    createCookie('noaa_weather_state', state, 7);
  }
  noaa_weather_fetch(lat, lng);
}

function noaa_icon(url){
  filename = url.replace(/^.*\/|\.[^.]*$/g, '');

  switch (filename){
    case 'sct':
      return 'mostly_clear-day.svg';
    case 'blizzard':
    case 'blizzard10':
    case 'blizzard20':
    case 'blizzard30':
    case 'blizzard40':
    case 'blizzard50':
    case 'blizzard60':
    case 'blizzard70':
    case 'blizzard80':
    case 'blizzard90':
    case 'blizzard100':
      return 'blizzard_winter_storm.svg';
    case 'blowingsnow':
    case 'nsn':
    case 'nsn10':
    case 'nsn100':
    case 'nsn20':
    case 'nsn30':
    case 'nsn40':
    case 'nsn50':
    case 'nsn60':
    case 'nsn70':
    case 'nsn80':
    case 'nsn90':
    case 'sn':
    case 'sn10':
    case 'sn100':
    case 'sn20':
    case 'sn30':
    case 'sn40':
    case 'sn50':
    case 'sn60':
    case 'sn70':
    case 'sn80':
    case 'sn90':
    case 'snow':
      return 'snow.svg';
    case  'cloudy':
      return 'cloudy_overcast.svg';
    case  'cloudynight':
    case 'hi_nmocldy':
    case 'hi_nptcldy':
    case 'mcloudyn':
    case 'nbkn':
    case 'nbknfg':
    case 'pcloudyn':
      return 'mostly_cloudy-night.svg';
    case 'cold':
    case 'cold1':
    case 'cold2':
      return 'cold.svg';
    case 'ra1':
    case 'drizzle':
    case 'mist':
      return 'drizzle.svg';
    case 'du':
    case 'dust':
    case 'smoke':
    case 'hazy':
      return 'hazy_smoke-day.svg';
    case 'fair':
    case 'skc':
    case 'sunny':
      return 'clear-day.svg';
    case 'fdrizzle':
    case 'sleet':
      return 'freezing_rain_sleet.svg';
    case 'few':
      return 'mostly_clear-day.svg';
    case 'flurries':
    case 'shsn':
    case 'snowshowers':
    case 'snowshwrs':
      return 'snow_flurries.svg';
    case 'fg':
    case 'fog':
    case 'fogn':
    case 'nfg':
    case 'sctfg':
      return 'fog.svg';
    case 'freezingrain':
    case 'fzra':
    case 'fzra1':
    case 'fzra100':
    case 'fzra10':
    case 'fzra20':
    case 'fzra30':
    case 'fzra40':
    case 'fzra50':
    case 'fzra60':
    case 'fzra70':
    case 'fzra80':
    case 'fzra90':
    case 'fzrara':
    case 'ip':
    case 'ip10':
    case 'ip100':
    case 'ip20':
    case 'ip30':
    case 'ip40':
    case 'ip50':
    case 'ip60':
    case 'ip70':
    case 'ip80':
    case 'ip90':
      return 'freezing_rain_sleet.svg';
    case 'hi_bkn':
    case 'hi_few':
    case 'hi_moclr':
    case 'hiclouds':
      return 'mostly_clear-day.svg';
    case 'hi_clr':
    case 'hi_skc':
      return 'clear-day.svg';
    case 'hi_mocldy':
    case 'hi_ptcldy':
    case 'hi_sct':
    case 'mcloudy':
    case 'pcloudy':
    case 'bkn':
      return 'mostly_cloudy-day.svg';
    case 'hi_nbkn':
    case 'hi_nfew':
    case 'hi_nmoclr':
    case 'hi_nsct':
    case 'nsct':
    case 'nfew':
    case 'nhiclouds':
      return 'mostly_clear-night.svg';
    case 'hi_nclr':
    case 'hi_nskc':
    case 'nskc':
    case 'sunnyn':
      return 'clear-night.svg';
    case 'hi_nshwrs':
    case 'hi_nshwrs10':
    case 'hi_nshwrs100':
    case 'hi_nshwrs20':
    case 'hi_nshwrs30':
    case 'hi_nshwrs40':
    case 'hi_nshwrs50':
    case 'hi_nshwrs60':
    case 'hi_nshwrs70':
    case 'hi_nshwrs80':
    case 'hi_nshwrs90':
    case 'hi_shwrs':
    case 'hi_shwrs10':
    case 'hi_shwrs100':
    case 'hi_shwrs20':
    case 'hi_shwrs30':
    case 'hi_shwrs40':
    case 'hi_shwrs50':
    case 'hi_shwrs60':
    case 'hi_shwrs70':
    case 'hi_shwrs80':
    case 'hi_shwrs90':
    case 'nscttsra':
    case 'nscttrsa10':
    case 'nscttrsa100':
    case 'nscttrsa20':
    case 'nscttrsa30':
    case 'nscttrsa40':
    case 'nscttrsa50':
    case 'nscttrsa60':
    case 'nscttrsa70':
    case 'nscttrsa80':
    case 'nscttrsa90':
    case 'showers':
    case 'shra':
    case 'shra1':
    case 'shra10':
    case 'shra100':
    case 'shra2':
    case 'shra20':
    case 'shra30':
    case 'shra40':
    case 'shra50':
    case 'shra60':
    case 'shra70':
    case 'shra80':
    case 'shra90':
      return 'showers_scattered_rain.svg';
    case 'hi_ntsra':
    case 'hi_ntsra10':
    case 'hi_ntsra100':
    case 'hi_ntsra20':
    case 'hi_ntsra30':
    case 'hi_ntsra40':
    case 'hi_ntsra50':
    case 'hi_ntsra60':
    case 'hi_ntsra70':
    case 'hi_ntsra80':
    case 'hi_ntsra90':
    case 'hi_tsra':
    case 'hi_tsra10':
    case 'hi_tsra100':
    case 'hi_tsra20':
    case 'hi_tsra30':
    case 'hi_tsra40':
    case 'hi_tsra50':
    case 'hi_tsra60':
    case 'hi_tsra70':
    case 'hi_tsra80':
    case 'hi_tsra90':
    case 'ntsra':
    case 'ntsra1':
    case 'ntsra10':
    case 'ntsra100':
    case 'ntsra20':
    case 'ntsra30':
    case 'ntsra40':
    case 'ntsra50':
    case 'ntsra60':
    case 'ntsra70':
    case 'ntsra80':
    case 'ntsra90':
    case 'ntsraold':
    case 'scttsra':
    case 'scttsra10':
    case 'scttsra100':
    case 'scttsra20':
    case 'scttsra30':
    case 'scttsra40':
    case 'scttsra50':
    case 'scttsra60':
    case 'scttsra70':
    case 'scttsra80':
    case 'scttsra90':
    case 'tsra':
    case 'tsra10':
    case 'tsra100':
    case 'tsra20':
    case 'tsra30':
    case 'tsra40':
    case 'tsra50':
    case 'tsra60':
    case 'tsra70':
    case 'tsra80':
    case 'tsra90':
    case 'tstorm':
    case 'tstormn':
      return 'thunderstorm.svg';
    case 'hot':
    case 'hot1':
      return 'hot.svg';
    case 'hurr':
      return 'hurricane.svg';
    case 'mix':
    case 'mix10':
    case 'mix100':
    case 'mix20':
    case 'mix30':
    case 'mix40':
    case 'mix50':
    case 'mix60':
    case 'mix70':
    case 'mix80':
    case 'mix90':
    case 'nmix':
    case 'nraip':
    case 'nraip10':
    case 'nraip100':
    case 'nraip20':
    case 'nraip30':
    case 'nraip40':
    case 'nraip50':
    case 'nraip60':
    case 'nraip70':
    case 'nraip80':
    case 'nraip90':
    case 'nrasn':
    case 'nrasn10':
    case 'nrasn100':
    case 'nrasn20':
    case 'nrasn30':
    case 'nrasn40':
    case 'nrasn50':
    case 'nrasn60':
    case 'nrasn70':
    case 'nrasn80':
    case 'nrasn90':
    case 'rainandsnow':
    case 'raip':
    case 'raip10':
    case 'raip100':
    case 'raip20':
    case 'raip30':
    case 'raip40':
    case 'raip50':
    case 'raip60':
    case 'raip70':
    case 'raip80':
    case 'raip90':
    case 'rasn':
    case 'rasn10':
    case 'rasn100':
    case 'rasn20':
    case 'rasn30':
    case 'rasn40':
    case 'rasn50':
    case 'rasn60':
    case 'rasn70':
    case 'rasn80':
    case 'rasn90':
    case 'Dualimage':
      return 'mixed_precip.svg';
    case 'na':
      return 'nodata.svg';
    case 'novc':
    case 'ovc':
      return 'cloudy_overcast.svg';
    case 'nra':
    case 'nra10':
    case 'nra100':
    case 'nra20':
    case 'nra30':
    case 'nra40':
    case 'nra50':
    case 'nra60':
    case 'nra70':
    case 'nra80':
    case 'nra90':
    case 'ra':
    case 'ra10':
    case 'ra100':
    case 'ra20':
    case 'ra30':
    case 'ra40':
    case 'ra50':
    case 'ra60':
    case 'ra70':
    case 'ra80':
    case 'ra90':
    case 'rain':
      return 'rain.svg';
    case 'nsvrtsra':
    case 'ntor':
    case 'tor':
      return 'tornado.svg';
    case 'nwind':
    case 'wind':
    case 'wind1':
    case 'wind2':
      return 'windy.svg';
    default:
      return 'find_weather_icon.png';
  }
}



function noaa_weather_fetch(lat,lng){
  jQuery.ajax({
      url:'https://forecast.weather.gov/MapClick.php',
      dataType: 'json',
      data: {
        lat:lat,
        lon:lng,
        unit:0,
        lg:'english',
        FcstType:'json'
      },
      success: function(data, textStatus, jqXHR){
        noaa_weather_parse(data);
        var nodata = !temp && temp !== 0;

        if (nodata) {
          var upperData = {nodata:true};
          var lowerData = {nodata:true};
        } else {
          var city = readCookie('noaa_weather_city');
          var state = readCookie('noaa_weather_state');
          var upperData = {deg:temp, city:city, state:state, icon:icon};
          var lowerData = {icon:icon, deg:temp, city:city, state:state, maxt:maxt, mint:mint, pop:pop12, wdir:noaa_weather_degrees_to_cardinal(wdir), wspd:wspd, lat:lat, lng:lng, precip_type:precip_type};
        }

        noaa_weather_build_template(upperData, lowerData);

        jQuery(".weather-widget-form").removeClass('no-weather');
        jQuery(".weather-widget-form").addClass('has-weather');

        if (nodata) {
          jQuery(".weather-widget-form").addClass('no-data');
        }
      },
      error: function() {
        //one possible no data case
        var upperData = {nodata:true};
        var lowerData = {nodata:true};

        noaa_weather_build_template(upperData, lowerData);

        jQuery(".weather-widget-form").removeClass('no-weather');
        jQuery(".weather-widget-form").addClass('has-weather');
        jQuery(".weather-widget-form").addClass('no-data');
      }
    });

  function noaa_weather_build_template(upperData, lowerData) {
    //reset form, because if you spam the button it just keeps adding more elements
    weatherRemoveElements();

    var upper_html = jQuery(".noaa_weather_upper").html();
    var upper_template = Handlebars.compile(upper_html);
    jQuery('.upper').append(upper_template(upperData));

    var lower_html = jQuery(".noaa_weather_lower").html();
    var lower_template = Handlebars.compile(lower_html);
    jQuery('.lower .close-button').after(lower_template(lowerData));
  }
}



function noaa_weather_parse($data) {
  icon = noaa_icon($data.currentobservation.Weatherimage);
  temp = $data.currentobservation.Date ==  "Data is Old"? null : $data.currentobservation.Temp;
  wspd = $data.currentobservation.Winds != "NA"?$data.currentobservation.Winds:null;
  wdir = $data.currentobservation.Windd != "NA"?$data.currentobservation.Windd:null;
  mint = $data.data.temperature[($data.time.tempLabel[1] == 'Low' ? 1 : 0)];
  maxt = $data.data.temperature[($data.time.tempLabel[0] == 'High' ? 0 : 1)];
  pop12 = $data.data.pop[0];
  precip_type = 'precipitation';

  if (pop12 != null && pop12 > 0) {
    precip_type = noaa_weather_parse_forecast_precip_type($data);
  }
}

function noaa_weather_parse_forecast_precip_type($data) {
    var ficon = $data.data.iconLink[0].replace(/^.*\/|\.[^.]*$/g, '');
    if (ficon == 'DualImage') {
      //this is definitely a mix of some sort.  the problem is, this dual image can give different % for each part
      //and each part may not include 'precipitation' as we've defined
      //and each part may itself be some kind of mix as denoted by a hyphen
      var left = getParameterByName('i', $data.data.iconLink[0]);
      var right = getParameterByName('j', $data.data.iconLink[0]);
      var type_abbr = left+'_'+right;

    } else {
      var pop = ficon.replace(/[\D]/g, '');
      var type_abbr = ficon.replace(/\d/g, '');
    }

    var type_object = {};

    jQuery.each(type_abbr.split('_'), function(I, E){
      //converting each type to a human readable word
      var type = noaa_weather_precip_type(E);
      //not keeping words that aren't mapped properly
      if (type != 'precipitation') {
        //and not keeping duplicates
        type_object[E] = noaa_weather_precip_type(E);
      }
    });

    var type_array = [];
    jQuery.each(type_object, function(I,E){
      type_array.push(E);
    });

    return type_array.length === 0 ? 'precipitation' : type_array.join('/') + (type_array.length > 1 ? ' mix':'');
}

function noaa_weather_precip_type(abbr) {
  switch (abbr) {
    case 'blizzard':
      return 'blizzard';
    case 'shwrs':
    case 'hi_shwrs':
    case 'hi_nshwrs':
      return 'showers';
    case 'shra':
    case 'nra':
    case 'ra':
      return 'rain';
    case 'nsn':
    case 'sn':
      return 'snow';
    case 'rasn':
    case 'nrasn':
      return 'rain/snow mix';
    case 'fzra':
      return 'freezing rain';
    case 'mix':
      return 'mix';
    case 'raip':
    case 'nraip':
      return 'rain/ice pellets';
    case 'ip':
      return 'ice pellets';
    case 'tsra':
    case 'ntsra':
      return 'thunderstorm/rain';
    case 'scttsra':
    case 'nscttsra':
      return 'scattered rain';
    default:
      return 'precipitation';
  }
}

function noaa_weather_degrees_to_cardinal(deg){
  deg = deg < 0 ? 0 : deg;//simple validation
  carr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
  return carr[parseInt(Math.round(parseFloat(deg) % 360 / 22.5), 10)];
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name,"",-1);
  }

jQuery(function($){

  var categories = [
    'Postal', 'Populated Place'
    ],
    cats = categories.join(',');


  //tabindex for weather widget
  var $elements = $('.weather-widget-form .close-button, .weather-widget-form .upper');
  $.each($elements, function(I, E){
    $(E).attr('tabindex', '0');
    $(E).on('keypress', function(e){
      if (e.which != 13) {
        //not enter eky
        return;
      }
      if ($(e.originalEvent.target).get(0).tagName == 'A') {
        $(e.originalEvent.target).trigger('click');
      } else {
        $(this).trigger('click');
      }
    });
  });

  $('.weather-widget-form .close-button, .weather-widget-form .upper').click(function(e){
    if($(e.target).is("a")){
      weatherChangeLocation();

      if (!$('.weather-widget-form .lower').is(':visible')) {
        weatherToggleLower();
      }
    } else {
      weatherToggleLower();
    }
  });
  $('form.weather-widget-form').submit(function(event){
    event.preventDefault();
    weatherSubmit(weatherSuggestion);
    $('.weather-widget-form').trigger('submitted');
  });
   noaa_weather();

  var weatherSuggestion;

  var defaultOptions = {
    appendTo: '.weather-widget-form .lower',
    serviceUrl: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest',
    deferRequestBy: 300,
    paramName: 'text',
    params: {
        f: 'json',
        countryCode: 'USA,PRI,VIR,GUM,ASM',
        category: cats,
        maxSuggestions: 10,
    },
    dataType: 'jsonp',
    transformResult: function (response) {
        return {
            suggestions: $.map(response.suggestions, function (i) {
                return {
                    value: i.text,
                    data: i.magicKey
                };
            })
        };
    },
    minChars: 3,
    showNoSuggestionNotice: true,
    tabDisabled: false,
    noSuggestionNotice: 'No results found. Try another search.',
    autoSelectFirst: true,
    onSelect: function (suggestion) {
      weatherSubmit(suggestion);
      weatherSuggestion = null;
    },
    onSearchComplete: function(query, suggestions){
      if (suggestions.length === 0) {
        $('.weather-widget-form').addClass('no-suggestions');
        weatherSuggestion = null;
      } else {
        $('.weather-widget-form').removeClass('no-suggestions');
        weatherSuggestion = suggestions[0];
      }
    }
  };

  $('.weather-widget-form .zip-input').devbridgeAutocomplete(defaultOptions);

  function weatherSubmit(suggestion) {
    if (!suggestion) {
      return;
    }
    var request;
//     if (overrides[suggestion.value]) {
//         doRedirectToGeometry(overrides[suggestion.value]);
//     } else {
        request = $.ajax({
            url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find',
            data: {
                text: suggestion.value,
                magicKey: suggestion.data,
                f: 'json'
            },
            jsonp: 'callback',
            dataType: 'jsonp'
        });
        request.done(function (data) {
            var loc = data.locations[0];
            if (loc) {
                noaa_weather(loc);
//                 doRedirectToGeometry(loc.feature.geometry);
            } else {
                alert('An unexpected error occurred. Please try a different search.');
            }
        });
//     }
  }
});

function weatherChangeLocation() {
  weatherRemoveElements();
  weatherRemoveCookies();
  if (!jQuery('.weather-widget-form .lower').is(':visible')) {
    weatherToggleLower();
  }
}

function weatherRemoveElements() {
  jQuery('.weather-widget-form .lower .forecast-wrapper').remove();
  jQuery('.weather-widget-form .lower a.not-available').remove();
  jQuery('.weather-widget-form .lower .city').remove();
  jQuery('.forecast-link').remove();
  jQuery('.current-temp').remove();
  jQuery('.weather-widget-form .inner').remove();
  jQuery(".weather-widget-form").toggleClass('no-weather');
  jQuery(".weather-widget-form").toggleClass('has-weather');
  jQuery(".weather-widget-form").removeClass('no-data');
  jQuery('input.zip-input').val('');
}

function weatherRemoveCookies() {
  eraseCookie('noaa_weather_zip');
  eraseCookie('noaa_weather_lat');
  eraseCookie('noaa_weather_lng');
  eraseCookie('noaa_weather_city');
  eraseCookie('noaa_weather_state');
}
function weatherToggleLower() {
  jQuery('.weather-widget-form .lower').slideToggle(400, function(){
    //add a trigger for others to act on when opening and closing the weather widget
   if (jQuery('.weather-widget-form .lower:visible').length > 0) {
     jQuery('.weather-widget-form').trigger('opened');
   } else {
     jQuery('.weather-widget-form').trigger('closed');
   }
  });
  jQuery('.weather-widget-form').toggleClass('opened');
  jQuery('.block-noaa-weather .block-title').toggleClass('opened');
}

function noaa_state_conversion(state){
var states_hash =
  {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District Of Columbia': 'DC',
    'D. C.': 'DC',
    'Federated States Of Micronesia': 'FM',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Marshall Islands': 'MH',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Palau': 'PW',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  };
return states_hash[state];
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
