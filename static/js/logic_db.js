var countries_with_data = ['Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Democratic Republic of the Congo', 'Denmark', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Eritrea', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Gabon', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan', 'Latvia', 'Lebanon', 'Libya', 'Lithuania', 'Luxembourg', 'Malaysia', 'Malta', 'Mauritius', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore', 'Slovenia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Yemen', 'Zambia', 'Zimbabwe', 'United States', 'Albania', 'Algeria', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Benin', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria'];
var years_with_data = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
var categories_energy_with_data = ['Balances','Renewables & waste'];
var categories_balances_with_data = ['Production','Imports','Exports','International marine bunkers','International aviation bunkers','Stock changes','TPES','Transfers','Statistical differences','Electricity plants','CHP plants','Heat plants','Gas works','Oil refineries','Coal transformation','Liquefication plants','Other transformation','Energy industry own use','Losses','Total final consumption','Industry','Transport','Residential','Commercial and public services','Agriculture / forestry','Fishing','Non-specified','Non-energy use'];
var categories_renewables_with_data = ['Gross elec. generation','Gross heat production','Production','Imports','Exports','Stock changes','Domestic supply','Statistical differences and transfers','Transformation','Electricity plants','CHP plants','Heat plants','Other transformation','Energy industry own use','Losses','Final consumption','Industry','Transport','Residential','Commercial and public services','Agriculture / forestry','Fishing','Other non-specified','Non-energy use'];

// function choose_country()

var dropdown_country = d3.select('body').select('form').select('#country_input');
var dropdown_year = d3.select('body').select('form').select('#year_input');
var dropdown_category = d3.select('body').select('form').select('#category_input');
var dropdown_energycategory = d3.select('body').select('form').select('#energycategory_input');
// console.log(dropdown);

function title_case(string) {
    var sentence = string.toLowerCase();
    sentence[0] = sentence[0].toUpperCase();
    return sentence;
}

dropdown_country.selectAll('option')
    .data(countries_with_data)
    .enter()
    .append('option')
    .attr('value',d => d)
    .text(d => d)
    
dropdown_year.selectAll('option')
    .data(years_with_data)
    .enter()
    .append('option')
    .attr('value',d => d)
    .text(d => d)

dropdown_energycategory.selectAll('option')
    .data(categories_energy_with_data)
    .enter()
    .append('option')
    .attr('value',d => d)
    .text(d => d)

dropdown_category.selectAll('option')
    .data(categories_balances_with_data)
    .enter()
    .append('option')
    .attr('value',d => d)
    .text(d => d)

dropdown_energycategory.on('change', function () {
    var current_energycategory = d3.select('#energycategory_input').property('value')
    switch(current_energycategory) {
        case "Balances":
            dropdown_category.selectAll('option').remove()
            dropdown_category.selectAll('option')
                .data(categories_balances_with_data)
                .enter()
                .append('option')
                .attr('value',d => d)
                .text(d => d)
            break;
        case "Renewables & waste":
            dropdown_category.selectAll('option').remove()
            dropdown_category.selectAll('option')
                .data(categories_renewables_with_data)
                .enter()
                .append('option')
                .attr('value',d => d)
                .text(d => d)
            break;
        default:
    }
        
})
// dropdown.select('div').select('a').on('click', choose_country);

