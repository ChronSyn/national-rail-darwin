/* eslint-env mocha */

/*
    Test parsers are working correctly.
    arrivalBoardWithDets - DONE
    arrivalBoardWithDets_bus - DONE
    arrivalDepartureBoard
    arrivalDepartureBoardWithDetails - DONE
    arrivalsBoard
    departureBoard
    departureBoardWithDetails
    fastestDeparture - DONE
    fastestDepartureWithDEtails - DONE
    nextDeparture
    nextDepartureWithDetails - DONE
    serviceDetails - DONE
*/

var assert = require('assert')
var parsers = require('../parsers.js')
var fs = require('fs')

/* arrivalBoardWithDets.xml */
describe('ArrivalBoardWithDetails parsed correctly', function () {
  var fileContent = fs.readFileSync('./exampleResponses/arrivalBoardWithDets.xml', 'UTF-8')
  var parsedResult = parsers.parseArrivalsBoardWithDetails(fileContent)

  it('5 train services returned', function () {
    assert.equal(5, parsedResult.trainServices.length)
  })

  it('Service id of first service is resovled', function () {
    assert.equal('JKHCdijlX9lRFw2FwqELPA==', parsedResult.trainServices[0].serviceId)
  })

  it('STA of second service is correct', function () {
    assert.equal('21:34', parsedResult.trainServices[1].sta)
  })

  it('Operator of second service is train', function () {
    assert.equal('South West Trains', parsedResult.trainServices[1].operator)
  })
})

/* arrivalBoardWithDets_bus.xml */
describe('Arrival Departure Board with Details when no train services are available', function () {
  var fileContent = fs.readFileSync('./exampleResponses/arrivalBoardWithDets_bus.xml', 'UTF-8')
  var parsedResult = parsers.parseArrivalsBoardWithDetails(fileContent)

  it('does not throw an error', function () {
    assert.deepEqual([], parsedResult.trainServices)
  })
})

/* arrivalDepartureBoardWithDetails.xml */
describe('Arrival Departure Board with Details parsing is correct', function () {
  var fileContent = fs.readFileSync('./exampleResponses/arrivalDepartureBoardWithDetails.xml', 'UTF-8')
  var parsedResult = parsers.parseArrivalsDepartureBoardWithDetails(fileContent)

  it('Arrival Departure Board sta = 21:34', function () {
    assert.equal('21:34', parsedResult.trainServices[0].sta)
  })
  it('lArrival Departure Board eta = On time', function () {
    assert.equal('On time', parsedResult.trainServices[0].eta)
  })
  it('Arrival Departure Boardstd = 21:34', function () {
    assert.equal('21:34', parsedResult.trainServices[0].std)
  })
  it('Arrival Departure Board etd = On time', function () {
    assert.equal('On time', parsedResult.trainServices[0].etd)
  })
  it('Arrival Departure Board platform = 1', function () {
    assert.equal('1', parsedResult.trainServices[0].platform)
  })
  it('Arrival Departure Board operator = South West Trains', function () {
    assert.equal('South West Trains', parsedResult.trainServices[0].operator)
  })
  it('Arrival Departure Board operatorCode = SW', function () {
    assert.equal('SW', parsedResult.trainServices[0].operatorCode)
  })
  it('Arrival Departure Board length = 5', function () {
    assert.equal('5', parsedResult.trainServices[0].length)
  })
  it('Arrival Departure BoardservicId = MrHNnCAHgnHGs5KtWtLkWw==', function () {
    assert.equal('MrHNnCAHgnHGs5KtWtLkWw==', parsedResult.trainServices[0].serviceId)
  })
  it('Arrival Departure Board origin = WAT and LondonWaterloo', function () {
    var origin = parsedResult.trainServices[0].origin
    assert.equal('London Waterloo', origin.name)
    assert.equal('WAT', origin.crs)
  })
  it('Arrival Departure Board origin = WAT and LondonWaterloo', function () {
    var destination = parsedResult.trainServices[0].destination
    assert.equal('London Waterloo', destination.name)
    assert.equal('WAT', destination.crs)
  })
  it('PreviousCallingPoints array is correct size 14', function () {
    var arr = parsedResult.trainServices[0].previousCallingPoints
    assert.equal(14, arr.length)
  })
  it('Last previous calling point crs code = WAT', function () {
    var arr = parsedResult.trainServices[0].previousCallingPoints
    assert.equal('HOU', arr[13].crs)
  })
  it('Last previous calling point locationName = London Waterloo', function () {
    var arr = parsedResult.trainServices[0].previousCallingPoints
    assert.equal('Hounslow', arr[13].locationName)
  })
  it('Last previous calling point st = 09:45', function () {
    var arr = parsedResult.trainServices[0].previousCallingPoints
    assert.equal('21:31', arr[13].st)
  })
  it('Last previous calling point et = On time', function () {
    var arr = parsedResult.trainServices[0].previousCallingPoints
    assert.equal('On time', arr[13].et)
  })
  it('SubsequentCallingPoints array is correct size 14', function () {
    var arr = parsedResult.trainServices[0].subsequentCallingPoints
    assert.equal(12, arr.length)
  })
  it('First subsequent calling point crs code = WAT', function () {
    var arr = parsedResult.trainServices[0].subsequentCallingPoints
    assert.equal('SYL', arr[0].crs)
  })
  it('First subsequent calling point locationName = London Waterloo', function () {
    var arr = parsedResult.trainServices[0].subsequentCallingPoints
    assert.equal('Syon Lane', arr[0].locationName)
  })
  it('First subsequent calling point st = 09:45', function () {
    var arr = parsedResult.trainServices[0].subsequentCallingPoints
    assert.equal('21:36', arr[0].st)
  })
  it('First subsequent calling point et = On time', function () {
    var arr = parsedResult.trainServices[0].subsequentCallingPoints
    assert.equal('On time', arr[0].et)
  })
})

/* fastestDeparture.xml */
describe('FastestDeparture parsed correctly', function () {
  var fileContent = fs.readFileSync('./exampleResponses/fastestDeparture.xml', 'UTF-8')
  var parsedResult = parsers.parseFastestDeparture(fileContent)

  it('1 train service returned', function () {
    assert.equal(1, parsedResult.trainServices.length)
  })

  it('Service id of service is resovled', function () {
    assert.equal('h+ZvwWteiW7bdhcG1S/fBw==', parsedResult.trainServices[0].serviceId)
  })

  it('STA of service is correct', function () {
    assert.equal('07:47', parsedResult.trainServices[0].sta)
  })

  it('Operator of service is South West Trains', function () {
    assert.equal('South West Trains', parsedResult.trainServices[0].operator)
  })

  it('Origin of service is Weybridge', function () {
    assert.equal('Weybridge', parsedResult.trainServices[0].origin.name)
    assert.equal('WYB', parsedResult.trainServices[0].origin.crs)
  })
})

/* fastestDepartureWithDetails.xml */
describe('FastestDeparture with Details parsed correctly', function () {
  var fileContent = fs.readFileSync('./exampleResponses/fastestDeparturesWithDetails.xml', 'UTF-8')
  var parsedResult = parsers.parseFastestDeparturesWithDetail(fileContent)

  it('1 train service returned', function () {
    assert.equal(1, parsedResult.trainServices.length)
  })

  it('Service id of service is resovled', function () {
    assert.equal('h+ZvwWteiW7bdhcG1S/fBw==', parsedResult.trainServices[0].serviceId)
  })

  it('ETA of service is correct', function () {
    assert.equal('On time', parsedResult.trainServices[0].eta)
  })

  it('Operator of service is South West Trains', function () {
    assert.equal('South West Trains', parsedResult.trainServices[0].operator)
  })

  it('Origin of service is Weybridge', function () {
    assert.equal('London Waterloo', parsedResult.trainServices[0].destination.name)
    assert.equal('WAT', parsedResult.trainServices[0].destination.crs)
  })

  it('Subsequent Calling Points is ok', function () {
    assert.equal(12, parsedResult.trainServices[0].subsequentCallingPoints.length)
    assert.equal('Chiswick', parsedResult.trainServices[0].subsequentCallingPoints[3].locationName)
    assert.equal(10, parsedResult.trainServices[0].subsequentCallingPoints[3].length)
    assert.equal('07:58', parsedResult.trainServices[0].subsequentCallingPoints[3].st)
  })

  console.log(parsedResult.trainServices[0])
})

/* fastestDeparture.xml */

describe('getNextDepartureWithDetails parsed correctly', function () {
  var fileContent = fs.readFileSync('./exampleResponses/nextDepartureWithDetails.xml', 'UTF-8')
  var parsedResult = parsers.parseNextDepartureWithDetailsResponse(fileContent)

  it('1 train service returned', function () {
    assert.equal(1, parsedResult.trainServices.length)
  })

  it('Service id of service is resovled', function () {
    assert.equal('joeW8tei9n7td3Xrk7JgPw==', parsedResult.trainServices[0].serviceId)
  })

  it('STA of service is correct', function () {
    assert.equal('09:22', parsedResult.trainServices[0].sta)
  })

  it('Operator of service is South West Trains', function () {
    assert.equal('South West Trains', parsedResult.trainServices[0].operator)
  })

  it('Origin of service is Weybridge', function () {
    assert.equal('London Waterloo', parsedResult.trainServices[0].origin.name)
    assert.equal('WAT', parsedResult.trainServices[0].origin.crs)
  })
})

/* serviceDetails.xml */
describe('Service Details parsing is correct', function () {
  var fileContent = fs.readFileSync('./exampleResponses/serviceDetails.xml', 'UTF-8')
  var parsedResult = parsers.parseServiceDetails(fileContent)
  it('returned object from example operator code = SW', function () {
    assert.equal('SW', parsedResult.serviceDetails.operatorCode)
  })
  it('returned obejct from example operator = South West Trains', function () {
    assert.equal('South West Trains', parsedResult.serviceDetails.operator)
  })
  it('returned object from example sta = 10:34', function () {
    assert.equal('10:34', parsedResult.serviceDetails.sta)
  })
  it('returned object from example std = 10:34', function () {
    assert.equal('10:34', parsedResult.serviceDetails.std)
  })
  it('returned object from example eta = On time', function () {
    assert.equal('On time', parsedResult.serviceDetails.eta)
  })
  it('returned object from example etd = On time', function () {
    assert.equal('On time', parsedResult.serviceDetails.etd)
  })
  it('returned object from example length = 5', function () {
    assert.equal('5', parsedResult.serviceDetails.length)
  })
  it('returned object from example platform = 1', function () {
    assert.equal('1', parsedResult.serviceDetails.platform)
  })
  it('PreviousCallingPoints array is correct size 14', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal(14, arr.length)
  })
  it('First previous calling point crs code = WAT', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('WAT', arr[0].crs)
  })
  it('First previous calling point locationName = London Waterloo', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('London Waterloo', arr[0].locationName)
  })
  it('First previous calling point st = 09:45', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('09:45', arr[0].st)
  })
  it('First previous calling point et = On time', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('On time', arr[0].et)
  })
  it('subsequentCallingPoints array is correct size 12', function () {
    var arr = parsedResult.serviceDetails.subsequentCallingPoints
    assert.equal(12, arr.length)
  })
  it('last subsequent calling point crs code = WAT', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('WAT', arr[0].crs)
  })
  it('last subsequent calling point locationName = London Waterloo', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('London Waterloo', arr[0].locationName)
  })
  it('last subsequent calling point st = 11:11', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('09:45', arr[0].st)
  })
  it('last subsequent calling point et = On time', function () {
    var arr = parsedResult.serviceDetails.previousCallingPoints
    assert.equal('On time', arr[0].et)
  })
})
