function parseUplink(device, payload)
{
    var parsed = payload.asParsedObject();
    env.log(parsed);    

    // Store Battery state
    if(parsed.bat != null){
        var bat = device.endpoints.byAddress("1");

        if (bat != null)
            bat.updateGenericSensorStatus(parsed.bat);
    };
   
    // Store Count
    if(parsed.cnt != null){
        var cnt = device.endpoints.byAddress("2");

        if (cnt != null)
            cnt.updateGenericSensorStatus(parsed.cnt);
    };

    // Store Pressure
    if(parsed.data != null){
        var press = device.endpoints.byAddress("3");

        if (press != null)
            //El valor de data esta llegando como string en vez de número e incluye el caracter ASCII del símbolo de porcentaje
            // Entonces hay que eliminarlo, una forma es reemplazarlo por un string vacio.
            press.updatePressureSensorStatus(parsed.data.replace('Bar', '')*100000);
    };

    // Store Temperature
    if(parsed.temp != null){
        var temp = device.endpoints.byAddress("4");

        if (temp != null)
            //El valor de temp esta llegando como string en vez de número e incluye el caracter ASCII del símbolo de porcentaje
            // Entonces hay que eliminarlo, una forma es reemplazarlo por un string vacio.
            temp.updateTemperatureSensorStatus(parsed.temp.replace('°C', ''));
    };

    // Store RSSI
    if(payload.rssi != null){
        var rssi = device.endpoints.byAddress("5");

        if (rssi != null)
            rssi.updateGenericSensorStatus(payload.rssi.strength);
    }

}

function buildDownlink(device, endpoint, command, payload) 
{ 
	// Esta función permite convertir un comando de la plataforma en un
	// payload que pueda enviarse al dispositivo.
	// Más información en https://wiki.cloud.studio/page/200

	// Los parámetros de esta función, son:
	// - device: objeto representando el dispositivo al cual se enviará el comando.
	// - endpoint: objeto endpoint representando el endpoint al que se enviará el 
	//   comando. Puede ser null si el comando se envía al dispositivo, y no a 
	//   un endpoint individual dentro del dispositivo.
	// - command: objeto que contiene el comando que se debe enviar. Más
	//   información en https://wiki.cloud.studio/page/1195.

	// Este ejemplo está escrito asumiendo un dispositivo que contiene un único 
	// endpoint, de tipo appliance, que se puede encender, apagar y alternar. 
	// Se asume que se debe enviar un solo byte en el payload, que indica el tipo 
	// de operación.

/*
	 payload.port = 25; 	 	 // Este dispositivo recibe comandos en el puerto LoRaWAN 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // El comando 30 indica "encender" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // El comando 31 indica "apagar" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // El comando 32 indica "alternar" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

}