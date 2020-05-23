const SERVIDOR = "https://server-node-example.herokuapp.com/";
const TEMPLATE = "<tr><td>#TITLE#</td><td>#PRICE#</td><td>#DATE#</td></tr>";

$("#listaDeOfertas").hide();
$("#loading").hide();

$("#requisicaoAjax").click(function () {
  resetTable();
  loading(true);
  $.ajax({
    url: SERVIDOR + "promotios-hub",
    dataType: "json",
    type: "GET",
  }).done((response) => prepareToTable(response));
});

function prepareToTable(response) {
  response.forEach((element) => {
    let obj = TEMPLATE.replace("#TITLE#", element.nome)
      .replace("#PRICE#", element.valor)
      .replace("#DATE#", element.recieved_date);
    tableInsert(obj);
  });

  $("#listaDeOfertas").show();
  loading(false);
}

function tableInsert(item) {
  $("#listaDeOfertas").append(item);
}

function resetTable() {
  $("#listaDeOfertas").hide();
  $("#listaDeOfertas").empty();
  $("#listaDeOfertas").append(
    "<tr><th>Pacote</th><th>Preço (em reais)</th><th>Data do recibo</th></tr>"
  );
}

function loading(state) {
  if (state) {
    $("#loading").show();
  } else {
    $("#loading").hide();
  }
}
