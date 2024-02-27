$(document).ready(function () {
    $(".calc-button").on('click', function () {
        var rate = 0;
        var year = 0;
        var cost = 0;
        var energy = "energy";
        var energyElectro = "electro";
        var volumeCube = null;

        var inputs = $('.form-calc').serializeArray();
        inputs.forEach(element => {
            if (element.name === "year") {
                year = element.value;
            }

            if (element.name === "cost") {
                cost = element.value;
            }

            if (element.name === "energy") {
                energy = element.value;
            }

            if (element.name === "energy") {
                if (element.value == null) {
                    energy = energyElectro;
                } else {
                    energy = energy;
                }
            }
  

            if (element.name === "volume-cube") {
                volumeCube = element.value;
            }
        });
        $.ajax({
            url: 'https://api.nbrb.by/exrates/rates?periodicity=0',
            method: 'GET',
            success: function (response) {
                rate = response.filter(v => v.Cur_ID === 456 || v.Cur_ID === 451 || v.Cur_ID === 431);

                var result = "Вонючий расчет " + " " + 
                year + " " + 
                cost  + " " + 
                energy  + " " + 
                energyElectro  + " " + 
                volumeCube + " " + 
                rate[0].Cur_OfficialRate;

                $(".calculate").append('<div class="calc-result">'+result+'</div>');
        
            },
            error: function (xhr, status, error) {
                // Handle errors here
                console.error(status, error);
            }
        });
   

    });
})