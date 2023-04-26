class MiniMaple{

    derivative(exp, variable) {
        let res = ""
        let derivTerm = ""
        const [listOfSigns, listOfTerms] = getListOfTermsAndSigns(exp)
        for (let i = 0; i < listOfTerms.length; i++) {
            derivTerm = getDerivativeFromTerm(listOfTerms[i], variable)
            if (derivTerm == "") {
                continue
            }
            res += listOfSigns[i]+derivTerm
        }
        if (res == "") {
            return "0"
        }
        res = res.substring(1);
        return res
    }

    integral(exp, variable)
    {
      let res = ""
      let derivTerm = ""
      const [listOfSigns, listOfTerms] = getListOfTermsAndSigns(exp)
      for (let i = 0; i < listOfTerms.length; i++) {
          derivTerm = getIntegralFromTerm(listOfTerms[i], variable)
          if (derivTerm == "") {
              continue
          }
          res += listOfSigns[i]+derivTerm
      }
      if (res == "") {
          return "0"
      }
      res = res.substring(1);
      return res
    }




    graph(){
      // Convention: https://bl.ocks.org/mbostock/3019563
      const margin = { top: 10, right: 50, bottom: 50, left: 50 },
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      const svg = d3.select("#root").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Define chart area
      svg
        .append("clipPath")
        .attr("id", "chart-area")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)

      // Add Axes
      const xMax = 10;
      const yMax = 10;

      let xScale = d3.scaleLinear([-xMax, xMax], [0, width])
      let yScale = d3.scaleLinear([-yMax, yMax], [height, 0])

      let xAxis = d3.axisBottom(xScale)
      let yAxis = d3.axisLeft(yScale)
      svg.append("g")
        .attr("transform", `translate(0,${height/2})`)
        .call(xAxis)
      svg.append("g")
        .attr("transform", `translate(${width/2},0)`)
        .call(yAxis)

      // Axes label
      svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + 5)
        .attr("y", height + 35)
        .text("x");

      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -35)
        .attr("x", -height / 2)
        .attr("transform", "rotate(-90)")
        .html("y")

      //   +8x^2+7y^2+8   [+, +, +]   [8x^2, 7y, 8]

      // +8x^2+7y+8=0
      //  8x^2+8=-7y^2
      //(8x^2+8)/(-7)
      //
      //
      //




      // крч, не ебать мозг и делать константами (обнулять), 
      //все переменные, которые не соответствуют variable
      //
      function f(x) {
        return x;
      }

      function graphFunction() {
        let pointNum = 500;

        const data = [];
        for (let x = -500; x <= pointNum; x++) {
          let y = f(x);
          data.push([x, y])
        }
        return data;
      }

      // Add function graph
      let line = d3.line()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]))
      svg.append("path")
        .datum(graphFunction())
        .attr("clip-path", "url(#chart-area)")
        .attr("fill", "none")
        .attr("stroke", "teal")
        .attr("stroke-width", 2)
        .attr("d", line);

        graphFunction();
    }

}






// 2*x^2 -> 2*x^3/3
// 5 -> 5*x

function getIntegralFromTerm(term, variable){
  let res = ""
  const regex1 = new RegExp(`(\\d+)?\\*?(`+variable+`)(?:\\^(\\d+))?`);
  const matches = term.match(regex1)
  if (matches != null) {
      let mult = 1
      if (matches[1] != undefined ) {
          mult = Number(matches[1])
      }
      let power = 1
      if (matches[3] != undefined) {
          power = Number(matches[3])
      }
      //mult = mult * ( power - 1 > 0 ? power : 1)
      let multStr = (mult>0 ? mult.toString() : "")
      if (multStr != "") {
          multStr += "*"
      }
      res = multStr + ( power > 1 ? variable : "") + ( power - 1 > 1 ? "^" + (power - 1).toString() : "")
  }
  return res
}
//   +8x^2+7x+8   [+, +, +]   [8x^2, 7x, 8]
// 8x^2  ->  16*x
function getDerivativeFromTerm(term, variable) {
    let res = ""
    const regex1 = new RegExp(`(\\d+)?\\*?(`+variable+`)(?:\\^(\\d+))?`);
    const matches = term.match(regex1)
    if (matches != null) {
        let mult = 1
        if (matches[1] != undefined ) {
            mult = Number(matches[1])
        }
        let power = 1
        if (matches[3] != undefined) {
            power = Number(matches[3])
        }
        mult = mult * ( power - 1 > 0 ? power : 1)
        let multStr = (mult>0 ? mult.toString() : "")
        if (multStr != "" && power > 1) {
            multStr += "*"
        }
        res = multStr + ( power > 1 ? variable : "") + ( power - 1 > 1 ? "^" + (power - 1).toString() : "")
    }
    return res
}

function getListOfTermsAndSigns(exp) {
    let tmp = ""
    exp = '+' + exp.replace(/\s/g, '');
    let listOfTerms = []
    let allowedSymbols = '+-^1234567890abcdefghijklmnopqrstuvwxyz'.split('');
    let listOfSigns = []
    let firstSign = true
    for (let i = 0; i < exp.length; i++) {
        if (!allowedSymbols.includes(exp[i])) {
            throw "wrong symbol in input " + exp[i]
        }
        if (exp[i]=="+" || exp[i] =="-") {
            listOfSigns.push(exp[i])
            if (firstSign){
                firstSign = false
                continue
            }
            listOfTerms.push(tmp)
            tmp = ""
            continue
        }
        tmp += exp[i]
    }
    listOfTerms.push(tmp)
    return [listOfSigns, listOfTerms]
}

export {MiniMaple}
