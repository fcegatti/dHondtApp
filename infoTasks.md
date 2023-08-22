// Datos de muestra para las elecciones
// El umbral electoral para las generales es del 3% y para las municipales es del 5%, en ambos casos sobre votos válidos. Las variables de umbral son utilizados para las autonómicas, que es donde los umbrales varían.

// falta modificar calculateSeats para ajustar a la especificidad canaria de 9 circunscripciones electorales, 8 inferiores a la provincia y una circuscripción autonómica para las elecciones autonómicas. Gran Canaria (15), Tenerife (15), Fuerteaventura (8), La Gomera (8), La Palma (8), La Gomera (4), El Hierro (3) y 9 para la circunscripción autonómica. La barrera electoral de las circunscripciones insulares es de 15% válidos o 4% válidos en la suma de todas las circunscripciones.

// falta modificar calculateSeats para ajustar a la especificidad balear de 4 circunscripciones electorales inferiores a la provincia para las elecciones autonómicas. Mallorca (33), Menorca (13), Eivissa (12) y Formentera (1).

/*
-En Extremadura, el umbral de votos es del 5% por circunscripción o 5% de la comunidad.
-En Valencia, el umbral es del 5% pero de los votos emitidos en toda la comunidad.
// CONFIRMAR QUE EL UMBRAL DE VOTOS DEL 5% ES SOBRE VOTOS VÁLIDOS EN CEUTA Y MELILLA


```
// código de 

//fin del código de 
```
  console.log("Checking parties for", acSelect.value);
updatePartyList();
      partyEntryForm.classList.remove('hide');
      partyListTitle.classList.remove('hide');
      addPartyForm.classList.remove('hide');
      partyListItems.classList.remove('hide');
      votingForm.classList.add('hide');
      votingForm.style.display = 'none';
