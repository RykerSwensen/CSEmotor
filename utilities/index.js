const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

module.exports = Util

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

  Util.buildByCarId = async function(data) {
    let grid
    if(data.length > 0) {
      
      grid = '<div class="car_display">'
      grid += `<img src="${data[0].inv_image}" alt="${data[0].inv_model}">`
      grid += `<div><h2>${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}</h2>
      <p><b>Price: $${new Intl.NumberFormat('en-US').format(data[0].inv_price)}</b></p>
      <p><b>Description:</b> ${data[0].inv_description}</p>
      <p><b>Color:</b> ${data[0].inv_color}</p>
      <p><b>Miles:</b> ${new Intl.NumberFormat('en-US').format(data[0].inv_miles)}<p></div></div>
      `
   
    } else {
      grid = "<p>No found<p>"
    }
    return grid
  }

  Util.buildInventoryDetailView = async function(data){
  
    let detailView
      if(data.length > 0){
       data.forEach(vehicle => {
        detailView = '<div id="container-detail">'
        detailView += '<div id="detail-content1">'
        detailView += '<img src="' + vehicle.inv_image
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model
        +' on CSE Motors" >'
        detailView += '</div>'
        detailView += '<div id="detail-content2">'
        detailView += '<h2>' + vehicle.inv_make + " " + vehicle.inv_model + " " + 'Details</h2>'
        detailView += '<span id="price">Price: $'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        detailView += '<p><span>Description:</span> ' + vehicle.inv_description + '</p>'
        detailView += '<p><span>Color:</span> ' + vehicle.inv_color + '</p>'
        detailView += '<p><span>Miles:</span> '
        + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>'
        detailView += '</div>'
        detailView += '</div>' 
       })
  } else {
    detailView += '<p class="notice"> Sorry, vehicle could not be found.</p>'
  }
  return detailView
  }
  
  
  
  /* ****************************************
   * Middleware For Handling Errors
   * Wrap other function in this for 
   * General Error Handling
   **************************************** */
  Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
  
  
  
  module.exports = Util