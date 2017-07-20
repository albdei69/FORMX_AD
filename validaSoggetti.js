function validaSoggettiCoinvolti(elencoSoggettiId)
{

var REG_EXP_CF_SAVE = "[0-9A-Z]{16}";

	//elencoSoggetti
	var elencoSoggettiCoinvolti = document.getElementById(elencoSoggettiId);	
	var soggettiCoinvolti = elencoSoggettiCoinvolti.querySelectorAll("[id^='soggetto_']");
	var numChildrenSoggettiCoinvolti = soggettiCoinvolti.length;

	//alert("numChildrenSoggettiCoinvolti = "+ numChildrenSoggettiCoinvolti); 
	var messaggi = new Array();
	var indexMessaggi = 0;

	var isProfessionista = false;
	var intestatarioPresente = false;
	var progettistaPresente = false; 
	var impresaPresente = false;  
	var ruoloCompilatorePresente = false; 	   
		
	var numeroIntestatari = 0;
	var numeroProgettisti = 0; 
	var numeroCointestatari = 0; //Controllo per titolarita' esclusiva


	var soggettoAmministratiNonSelezionato = false;
	
	var aventiTitoloRappresentati = new Array();
	var aventiTitoloRappresentatiIndex = 0;
	var aventiTitoloRappresentatiAssegnati = new Array();
	var aventiTitoloRappresentatiAssegnatiIndex = 0;		  
	 			 

	var ruoliCompilatore = [3] //solo il progettista;
	var codiciFiscali = new Array();
	// creazione array codici fiscali
	for (var i = 0; i < numChildrenSoggettiCoinvolti; i++) 
	{
		tipoSoggetto = soggettiCoinvolti[i].querySelector("[name^='TipoSoggetto_']:checked").value;
		if (tipoSoggetto=="PF")
			codiciFiscali[i] = soggettiCoinvolti[i].querySelector("[id^='CodiceFiscale_']").value;
		if (tipoSoggetto=="RS")
			codiciFiscali[i] = soggettiCoinvolti[i].querySelector("[id^='PartitaIva_']").value;		
		//alert("codiceFiscale = "+ codiciFiscali[i]);
	}
	
	msgError = "";
	
	for (var i = 0; i < numChildrenSoggettiCoinvolti; i++) 
	{ 
		var almenoUnRuoloPresente = false;
		
		var ruoliSoggetto = new Array();
		var indexRuoliSoggetto = 0;
		var indirizziSoggetto = new Array();
		var indexIndirizziSoggetto = 0;
		
		var isSoggettoProgettista = false;
		var isSoggettoAventeTitolo = false;	
		var isSoggettoIntestatario = false;
		var isSoggettoTecnico = false;
		var isSoggettoImpresa = false;
	
		// determino il progressivo partendo dall'id: soggetto_a1
		var idSoggetto_id = soggettiCoinvolti[i].id;
		var prog = idSoggetto_id.split("_")[1].substr(1,1);
		if (soggettiCoinvolti[i].querySelector("[id^='isProfessionista_']").value == "S") {
			isProfessionista = true;
		}
		// ciclo sui ruoli  divRuolo_a1_b1
		var parentNode = document.getElementById("elencoRuoli_a"+prog);
		var elencoRuoli = parentNode.querySelectorAll("select[id^='ruolo_']");
		//alert("elencoRuoli = " + elencoRuoli.length );		
		for (var n = 0; n < elencoRuoli.length; n++) {
			var idRuolo = elencoRuoli[n].value;
			if (idRuolo != '') {
				var tipoRuolo = getAttrRuolo(idRuolo,"tipologia");
				if (tipoRuolo == 'INT')
					isSoggettoIntestatario = true;
				if (tipoRuolo == 'TEC')
					isSoggettoTecnico = true;
				if (tipoRuolo == 'IMP')
					isSoggettoImpresa = true;
					
				almenoUnRuoloPresente = "true";
				ruoliSoggetto[indexRuoliSoggetto++] = idRuolo;
				if (idRuolo == '1') {
					intestatarioPresente = true;
					numeroIntestatari++;	
				}
				else if (idRuolo == '3'){
					progettistaPresente = true;
					numeroProgettisti++;	
					isSoggettoProgettista = true;
				}
				else if (idRuolo == '7'){
					numeroCointestatari++;	
				}
				else if (idRuolo == '6'){
					impresaPresente = true;	
				}
				else if (idRuolo == '13'){
					isSoggettoAventeTitolo = true;	
				}
			}
			if (isProfessionista == true && ruoloCompilatorePresente == false)  
			{
				for (var z = 0; z < ruoliCompilatore.length; z++)
				{           
					if (idRuolo == ruoliCompilatore[z])
					{
						ruoloCompilatorePresente = true;
						//alert("esiste un compilatore = " + codiciFiscali[i]);
					}
				}
			}	
		}
		if (almenoUnRuoloPresente == false) {
			msgError = "Indicare almeno un ruolo assunto dal soggetto";
			returnError(document.getElementById("ruolo_a"+prog+"_b1").id,msgError);
			return;			
		}	 				
		// fine ciclo sui ruoli
		
		
		//alert("inizio verifica dati anagrafici");
		// verifica datiAnagrafici
		var tipoSoggetto = "";
		var nominativo = "";
		if(document.getElementById("TipoSoggettoPF_a"+prog).checked) {
			tipoSoggetto = "PF";
			nominativo = document.getElementById("Cognome_a"+prog).value;
			//alert("soggetto : " + document.getElementById("Cognome_a"+prog).value + " tipoSoggetto: " + tipoSoggetto);
		}
		if(document.getElementById("TipoSoggettoPG_a"+prog).checked) {
			tipoSoggetto = "RS";
			nominativo = document.getElementById("RagioneSociale_a"+prog).value;
			//alert("soggetto : " + document.getElementById("RagioneSociale_a"+prog).value + " tipoSoggetto: " + tipoSoggetto);
		}
		var tipoSoggettoPresente = true; 		
		var datiPersonaFisicaCompleti = true;
		if (tipoSoggetto == "PF")
		{
			if (document.getElementById("Cognome_a"+prog).value != "" &&
				document.getElementById("Nome_a"+prog).value != "" &&
				document.getElementById("CodiceFiscale_a"+prog).value != "" && 
				document.getElementById("Sesso_a"+prog).value != "" &&         
				document.getElementById("ComuneNascita_a"+prog).value != "" && 
				(document.getElementById("SiglaProvinciaNascita_a"+prog).value != "" || document.getElementById("NazioneNascita_a"+prog).value != "ITALIA") &&          
				document.getElementById("DataNascita_a"+prog).value != "" &&
				document.getElementById("NazioneNascita_a"+prog).value != "")
			{          
				// datiPersonaFisicaCompleti = true;
				var dataNascitaPersonaFisicaValida = true; 
				if (!Utils_isCampoDataCorretto(document.getElementById("DataNascita_a"+prog).value)
					   || !Utils_isDataNonFutura(document.getElementById("DataNascita_a"+prog).value))
				{
					//dataNascitaPersonaFisicaValida = false;
				}
				if (dataNascitaPersonaFisicaValida == false)
				{
					msgError = "La data di nascita indicata non è valida";
					returnError(document.getElementById("DataNascita_a"+prog).id,msgError);
					return;
				}
  
				// controllo validità codice fiscale
				var isCodiceFiscaleValido = true; 
				var codiceDaVerificare = document.getElementById("CodiceFiscale_a"+prog).value;	
				if(codiceDaVerificare.length != 16)
				{
					isCodiceFiscaleValido = false;
				} 
				else if(Utils_isStringaValida(codiceDaVerificare , REG_EXP_CF_SAVE)==false)
				{										
					isCodiceFiscaleValido = false;						
				}
				if(isCodiceFiscaleValido == false) 
				{
					msgError = "Il codice fiscale inserito non è valido";
					returnError(document.getElementById("CodiceFiscale_a"+prog).id,msgError);
					return;
				}	
				
				// loop su array cf per controllo duplicato
				var isCFDuplicato = false;
				for (var z = 0; z < codiciFiscali.length; z++) 
				{
					if (z != i)    
					{
						if (codiceDaVerificare == codiciFiscali[z])
						{
							isCFDuplicato = true;
						}
					}                 
				}  
				if(isCFDuplicato == true) 
				{
					msgError = "Il codice fiscale inserito risulta duplicato";
					returnError(document.getElementById("CodiceFiscale_a"+prog).id,msgError);
					return;
				}	
				
				// popolo l'array degli aventi titolo
				if (isSoggettoAventeTitolo == true)
				{
					//aventiTitoloRappresentati[aventiTitoloRappresentatiIndex++] = document.getElementById("Cognome_a"+prog).value + " " + document.getElementById("Nome_a"+prog).value + " [" + document.getElementById("CodiceFiscale_a"+prog).value + "]";
					aventiTitoloRappresentati[aventiTitoloRappresentatiIndex++] = document.getElementById("CodiceFiscale_a"+prog).value;
				} 
			} 
			else  								          
			{     								          
				datiPersonaFisicaCompleti = false; 				
			}		
			if (datiPersonaFisicaCompleti == false)
			{		
				var idMancante = "";

				if (document.getElementById("ComuneNascita_a"+prog).value == "")
					idMancante = "ComuneNascita_a"+prog;
				if (document.getElementById("NazioneNascita_a"+prog).value == "ITALIA" && document.getElementById("SiglaProvinciaNascita_a"+prog).value == "" ) 
					idMancante = "SiglaProvinciaNascita_a"+prog;         
				if (document.getElementById("NazioneNascita_a"+prog).value == "")
					idMancante = "NazioneNascita_a"+prog;
				if (document.getElementById("DataNascita_a"+prog).value == "")
					idMancante = "DataNascita_a"+prog;					
				if (document.getElementById("Sesso_a"+prog).value == "")
					idMancante = "Sesso_a"+prog;         
				if (document.getElementById("CodiceFiscale_a"+prog).value == "")
					idMancante = "CodiceFiscale_a"+prog;
				if (document.getElementById("Nome_a"+prog).value == "")
					idMancante = "Nome_a"+prog;
				if (document.getElementById("Cognome_a"+prog).value == "")
					idMancante = "Cognome_a"+prog;
					
				msgError = "Non hai indicato un dato anagrafico obbligatorio ";
				returnError(document.getElementById(idMancante).id,msgError);
				return;		
			}			
		}
		else if (tipoSoggetto == "RS")
		{
			var datiPersonaGiuridicaCompleti = true;
			var REG_EXP_PIVA = "[0-9A-Z]{16}";
			if (document.getElementById("RagioneSociale_a"+prog).value != "" &&
				document.getElementById("PartitaIva_a"+prog).value != "" )
			{
				var isPivaValida = true;
				var codiceDaVerificare = document.getElementById("PartitaIva_a"+prog).value;	
				if(codiceDaVerificare.length == 16)													
				{																					
					isPivaValida = Utils_isStringaValida(codiceDaVerificare , REG_EXP_CF_SAVE);		
				}																					
				else if (codiceDaVerificare.length == 11)																					
				{																					
					isPivaValida = Utils_isStringaValida(codiceDaVerificare , REG_EXP_PIVA);			
				}		
				if(isPivaValida == false) 
				{
					msgError = "La Partita IVA inserita non è valida";
					returnError(document.getElementById("PartitaIva_a"+prog).id,msgError);
					return;
				}
				// popolo l'array degli aventi titolo
				if (isSoggettoAventeTitolo == true)
				{
					aventiTitoloRappresentati[aventiTitoloRappresentatiIndex++] = document.getElementById("PartitaIva_a"+prog).value;
				} 				
			}
			else {
				datiPersonaGiuridicaCompleti = false;
			}	
			if (datiPersonaGiuridicaCompleti == false)
			{
				var idMancante = "";
				if (document.getElementById("RagioneSociale_a"+prog).value == "")
					idMancante = "RagioneSociale_a"+prog;
				if (document.getElementById("PartitaIva_a"+prog).value == "")
					idMancante = "PartitaIva_a"+prog;				
								
				msgError = "I dati della persona giuridica sono incompleti";
				returnError(document.getElementById(idMancante).id,msgError);
				return;						
			}
  
		}
		else
		{          
			tipoSoggettoPresente = false;         
		}  
		if (tipoSoggettoPresente == false)
		{
			msgError = "Non hai indicato la tipologia di soggetto";
			returnError(document.getElementById("TipoSoggettoPF_a"+prog).id,msgError);
			return;		
		}
		// fine verifica datiAnagrafici

		//verifica indirizzi
		var parentNode = document.getElementById("elencoIndirizzi_a"+prog);
		var elencoIndirizzi = parentNode.querySelectorAll("div[id^='divIndirizzo_']");
		//alert("elencoIndirizzi di "+ nominativo + " [id "+ parentNode.id +"] = " + elencoIndirizzi.length );		

		var tipoIndirizzoPresente = true;   
		var indirizzoCompleto = true;		
		var indirizzoResidenzaPresente = false;
		var indirizzoComunicazioniPresente = false;
		var indirizzoSedePresente = false;

		for (var n = 0; n < elencoIndirizzi.length; n++) 
		{
			//determino il prog di livello 2
			var prog2 = n+1;
			var TipoIndirizzo = elencoIndirizzi[n].querySelector("select[id^='tipoIndirizzo_']");
			
			var capValue = document.getElementById("Cap_a"+prog+"_b"+prog2).value;
						
			if (TipoIndirizzo.value == "")  
			{
				tipoIndirizzoPresente = false;
			}
			else{
				if (TipoIndirizzo.value == 1)
					indirizzoComunicazioniPresente = true;
				if (TipoIndirizzo.value == 2)
					indirizzoResidenzaPresente = true;
				if (TipoIndirizzo.value == 3)
					indirizzoSedePresente = true;					
				
				if (document.getElementById("Via_a"+prog+"_b"+prog2).value == "" || 
					document.getElementById("Nazione_a"+prog+"_b"+prog2).value == "" ||
					document.getElementById("DescrizioneComune_a"+prog+"_b"+prog2).value == "" || 
					(document.getElementById("SiglaProvincia_a"+prog+"_b"+prog2).value != "" || document.getElementById("Nazione_a"+prog+"_b"+prog2).value != "ITALIA") &&     
					capValue == "" ||
					document.getElementById("Sedime_a"+prog+"_b"+prog2).value == "" ||		
					document.getElementById("Civico_a"+prog+"_b"+prog2).value == "" )             
				{
					indirizzoCompleto = false;
				}
			}
			if (tipoIndirizzoPresente == false)
			{ 
				msgError = "Non è stato indicato il tipo di indirizzo";
				returnError(document.getElementById(document.getElementById("tipoIndirizzo_"+prog+"_b"+prog2)).id,msgError);
				return;		
			}
			if (indirizzoCompleto == false)
			{ 
				var idMancante = "";
				if (document.getElementById("Via_a"+prog+"_b"+prog2).value == "")
					idMancante = "Via_a"+prog+"_b"+prog2;
				if (document.getElementById("Nazione_a"+prog+"_b"+prog2).value == "")
					idMancante = "Nazione_a"+prog+"_b"+prog2;
				if (document.getElementById("SiglaProvincia_a"+prog+"_b"+prog2).value == "" && document.getElementById("Nazione_a"+prog+"_b"+prog2).value == "ITALIA")
					idMancante = "SiglaProvincia_a"+prog+"_b"+prog2;
				if (document.getElementById("Sedime_a"+prog+"_b"+prog2).value == "")
					idMancante = "Sedime_a"+prog+"_b"+prog2;         
				if (document.getElementById("Civico_a"+prog+"_b"+prog2).value == "")
					idMancante = "Civico_a"+prog+"_b"+prog2;
				if (document.getElementById("Cap_a"+prog).value == "")
					idMancante = "Cap_a"+prog;
								
				msgError = "Non hai indicato un dato obbligatorio dell'indirizzo";
				returnError(document.getElementById(idMancante).id,msgError);
				return;	
			} 			
			
			var isCapValido = true;
			if (capValue != null && capValue != "")
			{
				var capIsNumeric = Utils_checkNumber(capValue);

				if (capIsNumeric == false) 
				{ 
					isCapValido = false;
				}
			}
			if (isCapValido == false)
			{ 
				msgError = "Il CAP indicato non è valido";
				returnError(document.getElementById(document.getElementById("Cap_a"+prog+"_b"+prog2)).id,msgError);
				return;		
			} 

			var isMailValida = true;
			var isMailCertificataValida = true;
			var isTelefonoValido = true;
			var isFaxValido = true;
			var isCellulareValido = true;
			var mailValue = document.getElementById("Email_a"+prog+"_b"+prog2).value;
			var mailCertificataValue = document.getElementById("EmailCertificata_a"+prog+"_b"+prog2).value;
			var telefonoValue = document.getElementById("Telefono_a"+prog+"_b"+prog2).value;
			var cellulareValue = document.getElementById("Cellulare_a"+prog+"_b"+prog2).value;
			var faxValue = document.getElementById("Fax_a"+prog+"_b"+prog2).value;
			
			var REG_EXP_EMAIL = "^[_\w\-]([_\.\-\w]*)@([\w\-]+\.)+[A-Z]{2,4}$";
			var REG_EXP_TELEFONO = "^[+]?[0-9]+$";
			
			if (mailValue != null && mailValue != "" )
			{
				isMailValida = Utils_isStringaValida(mailValue, REG_EXP_EMAIL);
				isMailValida = true;
			}
			if (mailCertificataValue != null && mailCertificataValue != "")
			{
				isMailCertificataValida = Utils_isStringaValida(mailCertificataValue, REG_EXP_EMAIL);
			}
			if (telefonoValue != null && telefonoValue != "")
			{
				isTelefonoValido = Utils_isStringaValida(telefonoValue, REG_EXP_TELEFONO);
			}
			if (faxValue != null && faxValue != "" )
			{
				isFaxValido = Utils_isStringaValida(faxValue, REG_EXP_TELEFONO);        
			}
			if (cellulareValue != null && cellulareValue != "")
			{
				isCellulareValido = Utils_isStringaValida(cellulareValue, REG_EXP_TELEFONO); 
			}
			if (isMailValida == false)
			{ 
				msgError = "L'indirizzo e-mail indicato non è valido";
				returnError(document.getElementById("Email_a"+prog+"_b"+prog2).id,msgError);
				return;		
			}
			if (isMailCertificataValida == false)
			{ 
				msgError = "L'indirizzo di posta elettronica certificata indicato non è valido";
				returnError(document.getElementById(document.getElementById("EmailCertificata_a"+prog+"_b"+prog2)).id,msgError);
				return;						
			}
			if (isTelefonoValido == false)
			{ 
				msgError = "Il numero di telefono indicato non è valido. Indicare solo numeri senza separatori";
				returnError(document.getElementById(document.getElementById("Telefono_a"+prog+"_b"+prog2)).id,msgError);
				return;				
			} 
			if (isFaxValido == false)
			{ 
				msgError = "Il numero di fax indicato non è valido";
				returnError(document.getElementById(document.getElementById("Fax_a"+prog+"_b"+prog2)).id,msgError);
				return;				} 

			if (isCellulareValido == false)
			{ 
				msgError = "Il numero di cellulare indicato non è valido";
				returnError(document.getElementById(document.getElementById("Cellulare_a"+prog+"_b"+prog2)).id,msgError);
				return;	
			} 
		}
		var legittimazioneCompleta = true; 
		if (isSoggettoIntestatario || isSoggettoAventeTitolo) {
			// deve essere presente il titolo di legittimazione
			var titoloLegittimazione = document.getElementById("IdLegittimazione_a"+prog).value;
			if (titoloLegittimazione == "") {
				legittimazioneCompleta = false;
			}
			if (legittimazioneCompleta == false)
			{ 
				msgError = "Il titolo di legittimazione non è stato indicato";
				returnError(document.getElementById(document.getElementById("IdLegittimazione_a"+prog)).id,msgError);
				return;
			} 			
		}
		var qualificazioneSoggettoRapp = document.getElementById("tipoQualificazioneA_a"+prog).checked;
		var titoloRappresentanzaNonSelezionato = false;
		if (isSoggettoIntestatario && qualificazioneSoggettoRapp) {
			var soggettoAmministrato = document.getElementById("AventeTitoloRappresentato_a"+prog).value; 
			if (soggettoAmministrato == ""){
				soggettoAmministratiNonSelezionato = true;
			}
			else {
				aventiTitoloRappresentatiAssegnati[aventiTitoloRappresentatiAssegnatiIndex++] = soggettoAmministrato;
			}
			var titoloRappresentanza = document.getElementById("IdTitoloRappresentanza_a"+prog).value; 
			if (titoloRappresentanza == "") {
				titoloRappresentanzaNonSelezionato = true;
			}
			if (titoloRappresentanzaNonSelezionato == true)
			{
				msgError = "Il titolo rappresentanza non è stato indicato";
				returnError(document.getElementById(document.getElementById("IdTitoloRappresentanza_a"+prog)).id,msgError);
				return;				
			}			
		}
		if (soggettoAmministratiNonSelezionato == true)
		{
			msgError = "Non è stato selezionato il soggetto avente titolo";
			returnError(document.getElementById(document.getElementById("AventeTitoloRappresentato_a"+prog)).id,msgError);
			return;				
		}
 
		if(isSoggettoTecnico) {
			var qualificaProfessionaleCompleta = true;
			if(document.getElementById("IdQualifica_a"+prog).value == "" || 
				document.getElementById("NumeroIscrizione_a"+prog).value == "" ||
				document.getElementById("SiglaProvincia_a"+prog).value == "" ||
				document.getElementById("IdOrdine_a"+prog).value == "")
			{
				qualificaProfessionaleCompleta = false;
			}
			if (qualificaProfessionaleCompleta == false)
			{
				var idMancante = "";
				if (document.getElementById("IdQualifica_a"+prog).value == "")
					idMancante = "IdQualifica_a"+prog;
				if (document.getElementById("NumeroIscrizione_a"+prog).value == "")
					idMancante = "NumeroIscrizione_a"+prog;				
				if (document.getElementById("SiglaProvincia_a"+prog).value == "")
					idMancante = "SiglaProvincia_a"+prog;	
				if (document.getElementById("IdOrdine_a"+prog).value == "")
					idMancante = "IdOrdine_a"+prog;		
					
				msgError = "I dati relativi alla qualifica professionale non sono completi";
				returnError(document.getElementById(idMancante).id,msgError);
				return;	
			}
		}
		
		// BEGIN verifica indirizzi in base al ruolo  0 = n.d. / 1 = indirizzo mancante / 2 = indirizzo presente
		var residenzaIntestatarioPresente = false;
		var residenzaCointestatatioPresente = false;
		var residenzaProgettistaPresente = false;  
		var comunicazioniProgettistaPresente = false;   
		var studioAltriRuoliPresente = false;  
		var residenzaAventeTitoloPresente = false;
		var studioAventeTitoloPresente = false;
		
		if (isSoggettoIntestatario && indirizzoResidenzaPresente) {
			residenzaIntestatarioPresente = true;
		}
		if (isSoggettoProgettista && indirizzoResidenzaPresente) {
			residenzaProgettistaPresente = true;
		}
		if (isSoggettoProgettista && indirizzoComunicazioniPresente) {
			comunicazioniProgettistaPresente = true;
		}
		if (isSoggettoTecnico && indirizzoSedePresente){
			studioAltriRuoliPresente = true;
		}
		if (isSoggettoAventeTitolo) {
			if (tipoSoggetto == "PF" && indirizzoResidenzaPresente)
				residenzaAventeTitoloPresente = true;
			if (tipoSoggetto == "RS" && indirizzoSedePresente)
				studioAventeTitoloPresente = true;
		}
		if (residenzaIntestatarioPresente == false)
		{ 
			messaggi[indexMessaggi++] = "Non è stato indicato l'indirizzo di residenza del soggetto intestatario";
		}

		if (residenzaCointestatatioPresente == false)
		{ 
			messaggi[indexMessaggi++] = "Non è stato indicato l'indirizzo di residenza del soggetto cointestatario";
		}

		if (residenzaProgettistaPresente == false)
		{ 
			messaggi[indexMessaggi++] = "Non è stato indicato l'indirizzo di residenza del soggetto progettista";
		}

		if (comunicazioniProgettistaPresente == false)
		{ 
			messaggi[indexMessaggi++] = "Non è stato indicato l'indirizzo per comunicazioni del soggetto progettista";
		}
		 
		if (studioAltriRuoliPresente == false || studioAventeTitoloPresente == false)
		{ 
			messaggi[indexMessaggi++] = "Non è stato indicato l'indirizzo di sede legale/studio del soggetto";
		}
		
		if (residenzaAventeTitoloPresente == false)
		{ 
			messaggi[indexMessaggi++] = "Non è stato indicato l'indirizzo di residenza del soggetto avente titolo";
		}	 	 

   
	}
 
	// messaggi generali su tutti i soggetti
	if (ruoloCompilatorePresente == false) {
		messaggi[indexMessaggi++] = "Attenzione! Per il soggetto compilante non è stato indicato il ruolo professionale richiesto";
	}

	if (intestatarioPresente == false)
	{ 
		messaggi[indexMessaggi++] = "Attenzione!Non è stato indicato un soggetto con ruolo intestatario";
	}
	 
	if (progettistaPresente == false)
	{
		messaggi[indexMessaggi++] = "Attenzione!Non è stato indicato un soggetto con ruolo progettista";
	}  
	if (numeroIntestatari > 1)
	{ 
		messaggi[indexMessaggi++] = "Attenzione! Deve essere indicato un solo soggetto intestatario";
	} 

	if (numeroProgettisti > 1)
	{ 
		messaggi[indexMessaggi++] = "Attenzione! Deve essere indicato un solo soggetto progettista";
	} 
	
	// gestione aventi titolo
	var isAventeTitoloRappresentatoAssegnato = false;
	for (var j = 0; j < aventiTitoloRappresentati.length; j++)
	{
		isAventeTitoloRappresentatoAssegnato = false;
		var aventeTitoloRappresentato = aventiTitoloRappresentati[j];

		for (var k = 0; k < aventiTitoloRappresentatiAssegnati.length; k++)
		{  
			var aventeTitoloRappresentatoAssegnato = aventiTitoloRappresentatiAssegnati[k];

			if (aventeTitoloRappresentato == aventeTitoloRappresentatoAssegnato)
			{
				isAventeTitoloRappresentatoAssegnato = true;
			}
		}

		if (isAventeTitoloRappresentatoAssegnato == false)
		{
			messaggi[indexMessaggi++] = "Attenzione! Il soggetto avente titolo con codice fiscale " + aventeTitoloRappresentato + "  non ha alcun rappresentante";  
		}  
	}	
	displayMessagi(messaggi);
 } 
 // fine validaSoggettiCoinvolti
 
/* 
*
*
*/

function Utils_isStringaValida(stringa, regexp)
{
 var pattern = new RegExp(regexp, "i");
 return pattern.test(stringa);
}

function Utils_isCampoDataCorretto(data)
{	
	var REG_EXP_DATA = "(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d";
    // 1. controllo di correttezza formale della stringa (dd/mm/yyyy)
	var dataStringa = data.formattedValue; //formattedValue a dispetto del nome restituisce il campo così come viene inserito
	var validitaEspressione = Utils_isStringaValida(dataStringa, REG_EXP_DATA);
	if (validitaEspressione==false)
	{	
		return false; // formato non corretto
	}
	/*
	//2. controllo che la data sia esistente
	var dataObj = util.scand("yyyy-mm-dd",data.rawValue);
    if(dataObj == null)
    {
    	return false;  // data non esistente
    }
	*/
    return true; // ok
} 

function Utils_isDataNonFutura(sDate)
{
 var dd_today = null;
 var mm_today = null;
 var yyyy_today = null;
 var dd = null;
 var mm = null;
 var yyyy = null;
 
 var dataNonFutura = true;
 
 var oToday = util.scand("yyyy-mm-dd", Date.rawValue);

 if (oToday!=null)
 {
  dd_today = oToday.getDate();
  mm_today = oToday.getMonth()+1;
  yyyy_today = oToday.getFullYear();
 }

 if (sDate != null) 
 { 
  var oDate = util.scand("yyyy-mm-dd", sDate);
 
  if (oDate != null)
  {
   dd = oDate.getDate();
   mm = oDate.getMonth()+1;
   yyyy = oDate.getFullYear();  
  }
 }

 if (yyyy != null && yyyy_today != null && mm != null && mm_today != null && dd != null && dd_today != null)
 {
  if (yyyy > yyyy_today)
  {
   dataNonFutura = false;
  }
  else if (yyyy == yyyy_today)
  {
   if (mm > mm_today)
   {
    dataNonFutura = false;
   }
   else if (mm == mm_today)
   {
    if (dd > dd_today)
    {
     dataNonFutura = false;
    }
   }
  }  
 }

 return dataNonFutura;
}

function Utils_checkNumber(text)  
{
 var pattern = new RegExp("^[0-9]*$");
 return pattern.test(text);
}

function returnError(field_id, msg) {
	document.getElementById(field_id).focus();
	document.getElementById(field_id).className = "error";
	alert(msg);
	return;
}

function displayMessagi(messaggi) {
	var messaggio = "";
	if (messaggi.length > 0)
	{
		for (var m = 0; m < messaggi.length; m++) 
		{  
			messaggio = messaggio + messaggi[m] + "\n";
		}

		alert(messaggio);
	}
 }