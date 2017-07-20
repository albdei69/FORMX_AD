	function saveJSON() {
		var jsonObj =  {};
		arraySoggetti = [];
		$("div[class='soggetto elenco']").each(function() {
			//alert("trovato soggetto");
			var objSoggetto = {};
			var objDatiAnagrafici = {};
			
			// Ruoli
			var ruoli = [];	
			var isSoggettoIntestatario = false;
			var isSoggettoTecnico = false;
			var isSoggettoImpresa = false;	
			var isSoggettoAventeTitolo = false;	
			
			$(this).find("select[id^='ruolo_']").each(function () {	
				var ruolo = {};
				ruolo["IdRuolo"] = this.value;
				ruoli.push(ruolo);	
				
				var idRuolo = this.value;
				if (idRuolo != '') {
					var tipoRuolo = getAttrRuolo(idRuolo,"tipologia");
					if (tipoRuolo == 'INT')	isSoggettoIntestatario = true;
					if (tipoRuolo == 'TEC') isSoggettoTecnico = true;
					if (tipoRuolo == 'IMP')	isSoggettoImpresa = true;
					if (tipoRuolo == 'AT')	isSoggettoAventeTitolo = true;
				}				
			});
			
			//Dati Anagrafici
			var tipoSoggetto = "";
			if($(this).find("[id^='TipoSoggettoPF_']").is(':checked') ) {
				tipoSoggetto = "PF";
				var soggettoFisico = {
					"CodiceFiscale" : $(this).find("[id^='CodiceFiscale_']").val(),
					"Cognome" : $(this).find("[id^='Cognome_']").val(),
					"Nome" : $(this).find("[id^='Nome_']").val(),
					"Sesso" : $(this).find("[id^='Sesso_']").val(),
					"DataNascita" : $(this).find("[id^='DataNascita_']").val(),
					"LuogoNascita" : $(this).find("[id^='ComuneNascita_']").val(),
					"SiglaProvinciaNascita" : $(this).find("[id^='SiglaProvinciaNascita_']").val(),
					"NazioneNascita" : $(this).find("[id^='NazioneNascita_']").val()			
				};				
				objDatiAnagrafici = {"tipoSoggetto": tipoSoggetto, "SoggettoFisico": soggettoFisico};				
			}
			else {
				tipoSoggetto = "RS";
				var soggettoGiuridico = {
					"RagioneSociale" : $(this).find("[id^='RagioneSociale_']").val(),
					"CodiceFiscale" : $(this).find("[id^='PartitaIva_']").val()
				};								
				objDatiAnagrafici = {"tipoSoggetto": tipoSoggetto, "SoggettoGiuridico": soggettoGiuridico};
			}
			var indirizzi = [];			
			$(this).find("div[id^='divIndirizzo_']").each(function () {	
				var indirizzo = {};
				indirizzo.IdTipoIndirizzo = $(this).find("[id^='tipoIndirizzo_']").val();
				indirizzo.Sedime = $(this).find("[id^='Sedime_']").val();
				indirizzo.Via = $(this).find("[id^='Via_']").val();
				indirizzo.Civico = $(this).find("[id^='Civico_']").val();
				indirizzo.DescrizioneComune = $(this).find("[id^='DescrizioneComune_']").val();
				indirizzo.SiglaProvincia = $(this).find("[id^='SiglaProvincia_']").val();
				indirizzo.Cap = $(this).find("[id^='Cap_']").val();
				indirizzo.Nazione = $(this).find("[id^='Nazione_']").val();
				indirizzo.Telefono = $(this).find("[id^='Telefono_']").val();
				indirizzo.Cellulare = $(this).find("[id^='Cellulare_']").val();
				indirizzo.Email = $(this).find("[id^='Email_']").val();
				indirizzo.EmailCertificata = $(this).find("[id^='EmailCertificata_']").val();
				indirizzo.Fax = $(this).find("[id^='Fax_']").val();				
				indirizzi.push(indirizzo);	
			});
			if (isSoggettoTecnico || isSoggettoImpresa) {				
				var objQualificazioneProfessionale = {};
				if (isSoggettoTecnico) {
					objQualificazioneProfessionale.IdQualifica = $(this).find("[id^='IdQualifica_']").val();
					var isDipendenteIntestatario = "N";
					if($(this).find("[id^='DipendenteIntestatario_']").is(':checked') ) {
						isDipendenteIntestatario = "S";
					}
				}
				objQualificazioneProfessionale.DipendenteIntestatario =	isDipendenteIntestatario;	
				var objOrdineProfessione = {};
				objOrdineProfessione.IdOrdine = $(this).find("[id^='IdOrdine_']").val();
				objOrdineProfessione.NumeroIscrizione = $(this).find("[id^='NumeroIscrizione_']").val();
				objOrdineProfessione.SiglaProvincia = $(this).find("[id^='SiglaProvincia_']").val();
				objQualificazioneProfessionale.OrdineProfessione = objOrdineProfessione;
			}
			if(isSoggettoIntestatario || isSoggettoAventeTitolo) {
				if(isSoggettoIntestatario) {
					var objQualificazioneSoggetto = {};
					objQualificazioneSoggetto.NumeroRichiedenti = $(this).find("[id^='NumeroRichiedenti_']").val();
					objQualificazioneSoggetto.AventeTitoloRappresentato = $(this).find("[id^='AventeTitoloRappresentato_']").val();
					objQualificazioneSoggetto.IdTitoloRappresentanza = $(this).find("[id^='IdTitoloRappresentanza_']").val();
					objQualificazioneSoggetto.tipoQualificazione = $(this).find("[id^='tipoQualificazione_']").val();
				}
				var objTitoloLegittimazione = {};
				objTitoloLegittimazione.IdLegittimazione = $(this).find("[id^='IdLegittimazione_']").val();
				objTitoloLegittimazione.tipoLegittimazione = $(this).find("[id^='tipoLegittimazione_']").val();
			}
			// fine popolamento dati 
						
			var objSoggettoCoinvolto = {};		
			objSoggettoCoinvolto.RuoloSoggetto = ruoli;
			objSoggettoCoinvolto.DatiAnagrafici = objDatiAnagrafici;
			objSoggettoCoinvolto.IndirizzoSoggetto = indirizzi;
			if (isSoggettoTecnico) {
				objSoggettoCoinvolto.QualificazioneProfessionale = objQualificazioneProfessionale;				
			}
			if(isSoggettoIntestatario || isSoggettoAventeTitolo) {
				if(isSoggettoIntestatario) {
					objSoggettoCoinvolto.QualificazioneSoggetto = objQualificazioneSoggetto;
				}
				objSoggettoCoinvolto.TitoloLegittimazione = objTitoloLegittimazione;
			}
			objSoggettoCoinvolto.idSoggetto = $(this).find("[id^='idSoggetto_']").val();
			objSoggettoCoinvolto.isProfessionista = $(this).find("[id^='isProfessionista_']").val();
			objSoggettoCoinvolto.isProfessionistaChanged = $(this).find("[id^='isProfessionistaChanged_']").val();
			
			objSoggetto["SoggettoCoinvolto"] = objSoggettoCoinvolto;
			arraySoggetti.push(objSoggetto);
		});
		// FINE elaborazione su div soggetti elenco
		jsonObj["elencoSoggetti"] = arraySoggetti;
		//console.log(jsonObj);
		jsonString = JSON.stringify(jsonObj,null,2);
		alert("jsonString: " + jsonString);
		
		var url = $( "#formSoggetti" ).attr("action");
		var getUrl = window.location;
		var baseUrl = getUrl .protocol + "//" + getUrl.host + url; // + "/" + getUrl.pathname.split('/')[1];
		alert("url: " + baseUrl);
		$.ajax({
			type: 'POST',
			url: baseUrl,
			data: jsonString, 
			success: function(result) { 
				alert("result: " + result.msg);
				
			},
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		});		
		
	}
	
