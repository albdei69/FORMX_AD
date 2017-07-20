var colorPlaceHolder = '#000';


	function createElementsFromJSON()
	{
		var elencoSoggetti = jsonSoggetti.elencoSoggetti
		for(var i in elencoSoggetti)
		{
			if (i > 0) {
				// aggiungo un nuovo soggetto
				addField(document.getElementById("elencoSoggetti"),[''],[''],'unbounded','soggetto elenco');
			}
			var nextSog = parseInt(i)+1;
			//alert("nextSog " + nextSog);
			var SoggettoCoinvolto = elencoSoggetti[i].SoggettoCoinvolto;
			var objectRuoloSoggetto = SoggettoCoinvolto.RuoloSoggetto;

			//var obj = document.createElement(object.element);

			for(var r = 0; r < objectRuoloSoggetto.length; r++){
				//for(var r in objectRuoloSoggetto) {
				var ruolo = objectRuoloSoggetto[r];
				var IdRuolo = ruolo.IdRuolo;		
				// inizializzo il primo elemento
				if (r == 0) {	
					var id = "ruolo_a"+nextSog+"_b1";
					//alert("idRuolo=" + IdRuolo + " - id=" + id);
					popolaElencoPlus(id,'ruoli');
					setRuolo(IdRuolo,id);
					$('#'+id).css('color', colorPlaceHolder);
					initSoggetto(id);
				}
				else {
					var parentId = 'elencoRuoli_a'+nextSog;
					var parentNode = document.getElementById(parentId);
					addField(parentNode,['ruolo'],[''],'unbounded','elenco');
					var nextR = parseInt(r)+1;
					var id = "ruolo_a"+nextSog+"_b"+nextR;
					popolaElencoPlus(id,'ruoli');
					setRuolo(IdRuolo,id);
					$('#'+id).css('color', colorPlaceHolder);
					initSoggetto(id);
				}
			}
			var datiAnagrafici = SoggettoCoinvolto.DatiAnagrafici;
			if (datiAnagrafici.tipoSoggetto == 'PF') {				
				var idTipoSoggetto = "TipoSoggettoPF_a"+nextSog;
				//nasconde la sezione persona giuridica
				showDiv(idTipoSoggetto,'datiPG_a'+nextSog,'datiPF_a'+nextSog);
				document.getElementById(idTipoSoggetto).value = datiAnagrafici.tipoSoggetto;
				if(datiAnagrafici.SoggettoFisico.Nome) {
					var idNome = "Nome_a"+nextSog;
					document.getElementById(idNome).value = datiAnagrafici.SoggettoFisico.Nome;
				}	
				if(datiAnagrafici.SoggettoFisico.Cognome) {				
					var idCognome = "Cognome_a"+nextSog;
					document.getElementById(idCognome).value = datiAnagrafici.SoggettoFisico.Cognome;
				}
				if(datiAnagrafici.SoggettoFisico.CodiceFiscale) {				
					var idCodiceFiscale = "CodiceFiscale_a"+nextSog;
					document.getElementById(idCodiceFiscale).value = datiAnagrafici.SoggettoFisico.CodiceFiscale;
				}
				if(datiAnagrafici.SoggettoFisico.Sesso) {
					var idSesso = "Sesso_a"+nextSog;
					document.getElementById(idSesso).value = datiAnagrafici.SoggettoFisico.Sesso;
					$('#'+idSesso).css('color', colorPlaceHolder);
				}
				if(datiAnagrafici.SoggettoFisico.DataNascita) {				
					var idDataNascita = "DataNascita_a"+nextSog;
					document.getElementById(idDataNascita).value = datiAnagrafici.SoggettoFisico.DataNascita;
				}
				if(datiAnagrafici.SoggettoFisico.NazioneNascita) {					
					var idNazioneNascita = "NazioneNascita_a"+nextSog;
					popolaNazioni(idNazioneNascita);
					document.getElementById(idNazioneNascita).value = datiAnagrafici.SoggettoFisico.NazioneNascita;
					$('#'+idNazioneNascita).css('color', colorPlaceHolder);
				}
				if(datiAnagrafici.SoggettoFisico.SiglaProvinciaNascita) {				
					var idSiglaProvinciaNascita = "SiglaProvinciaNascita_a"+nextSog;
					popolaProvincia(idSiglaProvinciaNascita);
					document.getElementById(idSiglaProvinciaNascita).value = datiAnagrafici.SoggettoFisico.SiglaProvinciaNascita;
					$('#'+idSiglaProvinciaNascita).css('color', colorPlaceHolder);	
				}
				if(datiAnagrafici.SoggettoFisico.LuogoNascita) {				
					var idComuneNascita = "ComuneNascita_a"+nextSog;
					popolaComuni(idSiglaProvinciaNascita,idComuneNascita);						
					$('#'+idComuneNascita +' option').each(function() { this.selected = (this.text.toUpperCase() == datiAnagrafici.SoggettoFisico.LuogoNascita); });
					$('#'+idComuneNascita).css('color', colorPlaceHolder);
				}
			}
			if (datiAnagrafici.tipoSoggetto == 'RS') {
				var idTipoSoggetto = "TipoSoggettoPG_a"+nextSog;
				document.getElementById(idTipoSoggetto).value = datiAnagrafici.tipoSoggetto;
				if (datiAnagrafici.SoggettoGiuridico.RagioneSociale) document.getElementById("RagioneSociale_a"+nextSog).value = datiAnagrafici.SoggettoGiuridico.RagioneSociale;
				if (datiAnagrafici.SoggettoGiuridico.CodiceFiscale) document.getElementById("PartitaIva_a"+nextSog).value = datiAnagrafici.SoggettoGiuridico.CodiceFiscale;
				showDiv(idTipoSoggetto,'datiPF_a'+nextSog,'datiPG_a'+nextSog);
			}
			var objectIndirizzoSoggetto = SoggettoCoinvolto.IndirizzoSoggetto;
			for(var r = 0; r < objectIndirizzoSoggetto.length; r++){
				var indirizzoSoggetto = objectIndirizzoSoggetto[r];		
				var nextR;
				// inizializzo il primo elemento
				if (r == 0) {	
					nextR = 1;					
				}
				else {
					var parentId = 'elencoIndirizzi_a'+nextSog;
					var parentNode = document.getElementById(parentId);
					addField(parentNode,['indirizzo'],[''],'unbounded','elenco');					
					nextR = parseInt(r)+1;
				}
				if (indirizzoSoggetto.IdTipoIndirizzo) {
					var idTipo = "tipoIndirizzo_a"+nextSog+"_b"+nextR;
					document.getElementById(idTipo).value = indirizzoSoggetto.IdTipoIndirizzo;
					$('#'+idTipo).css('color', colorPlaceHolder);					
				}
				if (indirizzoSoggetto.Presso) document.getElementById("Presso_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Presso;
				if (indirizzoSoggetto.Sedime) document.getElementById("Sedime_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Sedime;
				if (indirizzoSoggetto.Via) document.getElementById("Via_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Via;
				if (indirizzoSoggetto.Civico) document.getElementById("Civico_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Civico;
				if(indirizzoSoggetto.Nazione) {
					var idNazione = "Nazione_a"+nextSog+"_b"+nextR;
					popolaNazioni(idNazione);
					document.getElementById(idNazione).value = indirizzoSoggetto.Nazione;
					$('#'+idNazione).css('color', colorPlaceHolder);					
				}
				if(indirizzoSoggetto.SiglaProvincia) {
					var idSiglaProvincia = "SiglaProvincia_a"+nextSog+"_b"+nextR;
					popolaProvincia(idSiglaProvincia);
					document.getElementById(idSiglaProvincia).value = indirizzoSoggetto.SiglaProvincia;
					$('#'+idSiglaProvincia).css('color', colorPlaceHolder);	
				}
				if(indirizzoSoggetto.DescrizioneComune) {					
					var idDescrizioneComune = "DescrizioneComune_a"+nextSog+"_b"+nextR;
					popolaComuni(idSiglaProvincia,idDescrizioneComune);
					$('#'+idDescrizioneComune +' option').each(function() { this.selected = (this.text.toUpperCase() == indirizzoSoggetto.DescrizioneComune); });
					$('#'+idDescrizioneComune).css('color', colorPlaceHolder);
				}
				if (indirizzoSoggetto.Cap) document.getElementById("Cap_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Cap;
				
				if (indirizzoSoggetto.Telefono) document.getElementById("Telefono_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Telefono;
				if (indirizzoSoggetto.Cellulare) document.getElementById("Cellulare_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Cellulare;
				if (indirizzoSoggetto.Fax) document.getElementById("Fax_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Fax;
				if (indirizzoSoggetto.Email) document.getElementById("Email_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.Email;
				if (indirizzoSoggetto.EmailCertificata) document.getElementById("EmailCertificata_a"+nextSog+"_b"+nextR).value = indirizzoSoggetto.EmailCertificata;
					
				
			}
			var QualificazioneProfessionale = SoggettoCoinvolto.QualificazioneProfessionale;
			if (QualificazioneProfessionale) {
				if (QualificazioneProfessionale.IdQualifica) {
					var idIdQualifica = "IdQualifica_a"+nextSog;
					popolaElenco(idIdQualifica,'elencoQualificheProfessionali');
					document.getElementById(idIdQualifica).value = QualificazioneProfessionale.IdQualifica;
					$('#'+idIdQualifica).css('color', colorPlaceHolder);
				}
				if (QualificazioneProfessionale.DipendenteIntestatario && QualificazioneProfessionale.DipendenteIntestatario == "S") {
					document.getElementById("DipendenteIntestatario_a"+nextSog).checked = true;
				}
				if (QualificazioneProfessionale.OrdineProfessione) {
					var ordineProfessione  = QualificazioneProfessionale.OrdineProfessione;
					if (ordineProfessione.IdOrdine) {
						var idIdOrdine = "IdOrdine_a"+nextSog;
						popolaElenco(idIdOrdine,'elencoOrdiniProfessionali');
						document.getElementById(idIdOrdine).value = ordineProfessione.IdOrdine;
						$('#'+idIdOrdine).css('color', colorPlaceHolder);
					}		
					
					if (ordineProfessione.NumeroIscrizione) document.getElementById("NumeroIscrizione_a"+nextSog).value = ordineProfessione.NumeroIscrizione;
					if (ordineProfessione.SiglaProvincia) {
						var idSiglaProvincia = "SiglaProvincia_a"+nextSog;
						popolaProvincia(idSiglaProvincia);
						document.getElementById(idSiglaProvincia).value = ordineProfessione.SiglaProvincia;
						$('#'+idSiglaProvincia).css('color', colorPlaceHolder);
					}
				}
				if (datiAnagrafici.tipoSoggetto == 'RS') {
					// popola la sezione qualifica professionale per le imprese
					if (QualificazioneProfessionale.OrdineProfessione) {
						var ordineProfessione  = QualificazioneProfessionale.OrdineProfessione;
						if (ordineProfessione.IdOrdine) {
							var idIdOrdine = "IdOrdineCE_a"+nextSog;
							popolaElenco(idIdOrdine,'elencoCassaEdile');
							document.getElementById(idIdOrdine).value = ordineProfessione.IdOrdine;
							$('#'+idIdOrdine).css('color', colorPlaceHolder);
						}		
						
						if (ordineProfessione.NumeroIscrizione) document.getElementById("NumeroIscrizioneCE_a"+nextSog).value = ordineProfessione.NumeroIscrizione;
						if (ordineProfessione.SiglaProvincia) {
							var idSiglaProvincia = "SiglaProvinciaCE_a"+nextSog;
							popolaProvincia(idSiglaProvincia);
							document.getElementById(idSiglaProvincia).value = ordineProfessione.SiglaProvincia;
							$('#'+idSiglaProvincia).css('color', colorPlaceHolder);
						}
					}					
				}
			}
			var QualificazioneSoggetto = SoggettoCoinvolto.QualificazioneSoggetto;
			if (QualificazioneSoggetto) {
				if (QualificazioneSoggetto.NumeroRichiedenti) document.getElementById("NumeroRichiedenti_a"+nextSog).value = QualificazioneSoggetto.NumeroRichiedenti;
				if (QualificazioneSoggetto.tipoQualificazione == 'A') {
					var tipoQualificazioneA = "tipoQualificazioneA_a"+nextSog;
					document.getElementById(tipoQualificazioneA).checked = true ;
					showDiv(tipoQualificazioneA,"","datiRappresentanza_a"+nextSog);
					showDiv(tipoQualificazioneA,"titoloLegittimazione_a"+nextSog,"");
					if (QualificazioneSoggetto.AventeTitoloRappresentato) document.getElementById("AventeTitoloRappresentato_a"+nextSog).value = QualificazioneSoggetto.AventeTitoloRappresentato;
					if (QualificazioneSoggetto.IdTitoloRappresentanza) {
						var idIdTitoloRappresentanza = "IdTitoloRappresentanza_a"+nextSog;
						popolaElencoPlus(idIdTitoloRappresentanza,'titoliRappresentanza');
						document.getElementById(idIdTitoloRappresentanza).value = QualificazioneSoggetto.IdTitoloRappresentanza;
						$('#'+idIdTitoloRappresentanza).css('color', colorPlaceHolder);
					}					
				}
				else { 
					var tipoQualificazioneP = "tipoQualificazioneP_a"+nextSog;
					document.getElementById(tipoQualificazioneP).checked = true; 				
					showDiv(tipoQualificazioneP,'datiRappresentanza_a'+nextSog,'');
					showDiv(tipoQualificazioneP,'','titoloLegittimazione_a'+nextSog);				
				}
			}
			var TitoloLegittimazione = SoggettoCoinvolto.TitoloLegittimazione;
			if (TitoloLegittimazione) {
				var idTitoloLegittimazione = "IdLegittimazione_a"+nextSog;
				popolaElencoPlus(idTitoloLegittimazione,'titoliLegittimazione');
				document.getElementById(idTitoloLegittimazione).value = TitoloLegittimazione.IdLegittimazione;
				$('#'+idTitoloLegittimazione).css('color', colorPlaceHolder);			
			}
			if (SoggettoCoinvolto.idSoggetto)
				document.getElementById("idSoggetto_a"+nextSog).value = SoggettoCoinvolto.idSoggetto;
			if (SoggettoCoinvolto.isProfessionista)
				document.getElementById("isProfessionista_a"+nextSog).value = SoggettoCoinvolto.isProfessionista;
			if (SoggettoCoinvolto.isProfessionistaChanged)
				document.getElementById("isProfessionistaChanged_a"+nextSog).value = SoggettoCoinvolto.isProfessionistaChanged;				

				
			//if (typeof(object.children)=="object")
			//	createElementsFromJSON(object.children, obj);
		}
	}	

	function setRuolo(val, id){
		document.getElementById(id).value = val;
	}
	
	
	function getAttrs(DOMelement) {
		var obj = {};
		$.each(DOMelement.attributes, function () {
			if (this.specified) {
				obj[this.name] = this.value;
			}
		});
		return obj;
	}
	
	function init(arrayElements) {
		//popolaForm();
		for (var i = 0; i < arrayElements.length; i++) {
			initRemoveElement(arrayElements[i]);
		}
	}
	
	/*
		La funzione initRemoveElement visualizza o nasconde i pulsanti remove
	*/
	function initRemoveElement(parentNodeId) {
		//alert("parentNodeId:  " + parentNodeId);
		var parentDiv = document.getElementById(parentNodeId);		
		// acquisisco tutti i nodi di primo livello, ossia quelli che hanno come nodo parent quello con id passato in input, che hanno classe elenco
		var children = parentDiv.querySelectorAll("#"+ parentNodeId +" > .elenco");
		//alert("num child:  " + children.length);
		if (children.length == 0) {
			// ciclo sui nodi che non hanno classe elenco
			var otherChildren = parentDiv.getElementsByTagName('div');
			//alert("other child not class elenco:  " + otherChildren.length);
			if (otherChildren.length > 0) {
				for (var i = 0; i < otherChildren.length; i++) {
					if (otherChildren[i].id != null && otherChildren[i].id != "") {
						//alert("other child id:  " + otherChildren[i].id);
						initRemoveElement(otherChildren[i].id);
					}
				}
			}
		}
		if (children.length == 1) {
		/* in questo caso c'è solo una voce e quindi nascondo il pulsante remove */
			//alert("elenco singolo child id:  " + children[0].id);			
			children[0].querySelector("#"+children[0].id+" > button[id^='remove']").style.display = 'none';
			initRemoveElement(children[0].id);
		}
		else {
			for (var i = 0; i < children.length; i++) {
				//alert("elenco child id:  " + children[i].id);
				var buttRemove = children[i].querySelectorAll("#"+children[i].id+" > button[id^='remove']");
				//alert("buttRemove:  " + buttRemove.length);
				for (var n = 0; n < buttRemove.length; n++) {
					buttRemove[n].style.display = 'inline';
				}
				initRemoveElement(children[i].id);
			}		
		}
	}
	
	function initSoggetto(idRuolo) {
		// essendo idRuolo di secondo livello, prendo l'elemento 1 dell'array ottenuto dallo split
		var valPrimoLivello = idRuolo.split("_")[1];
		// in base al valore del ruolo imposto altre sezioni del soggetto
		var selectedRuolo = $('#'+idRuolo+' option:selected').val();
		//alert('ruolo='+selectedRuolo);
		if (selectedRuolo == '6') {
			// impresa lavori
			var tipoSoggettoPG = 'TipoSoggettoPG_'+valPrimoLivello;
			$('#'+tipoSoggettoPG).prop("checked", true);
			var tipoSoggettoPF = 'TipoSoggettoPF_'+valPrimoLivello;
			$('#'+tipoSoggettoPF).prop("checked", false);
			$('#'+tipoSoggettoPF).prop("disabled", true);
			showDiv(tipoSoggettoPG,'datiPF_'+valPrimoLivello,'datiPG_'+valPrimoLivello);
			document.getElementById('qualificazioneProfImp_'+valPrimoLivello).style.display = 'block';
			document.getElementById('qualificazioneProf_'+valPrimoLivello).style.display = 'none';
			document.getElementById('qualificazioneSogg_'+valPrimoLivello).style.display = 'none';
			document.getElementById('titoloLegittimazione_'+valPrimoLivello).style.display = 'none';
		}
		else {
			var tipoSoggettoPG = 'TipoSoggettoPG_'+valPrimoLivello;
			$('#'+tipoSoggettoPG).prop("checked", false);
			var tipoSoggettoPF = 'TipoSoggettoPF_'+valPrimoLivello;
			$('#'+tipoSoggettoPF).prop("checked", true);
			$('#'+tipoSoggettoPG).prop("disabled", true);
			showDiv(tipoSoggettoPF,'datiPG_'+valPrimoLivello,'datiPF_'+valPrimoLivello)	;
			var IDelencoRuoli = 'elencoRuoli_'+valPrimoLivello;
			if (selectedRuolo == '1' || selectedRuolo == '7' || selectedRuolo == '13') {
				// gestione ruoli intestatari
				if (selectedRuolo == '1') {
				// caso intestatario
					document.getElementById('qualificazioneSogg_'+valPrimoLivello).style.display = 'block';
					document.getElementById('primoIntestatario_'+valPrimoLivello).style.display = 'block';
					document.getElementById('cointestatario_'+valPrimoLivello).style.display = 'none';	
					//alert('tipoQualificazioneP_='+document.getElementById('tipoQualificazioneP_'+valPrimoLivello).checked);
					if(document.getElementById('tipoQualificazioneP_'+valPrimoLivello).checked) {
						document.getElementById('titoloLegittimazione_'+valPrimoLivello).style.display = 'block';
					}
				}
				if (selectedRuolo == '7') {
				// caso cointestatario
					document.getElementById('qualificazioneSogg_'+valPrimoLivello).style.display = 'block';
					document.getElementById('cointestatario_'+valPrimoLivello).style.display = 'block';	
					document.getElementById('primoIntestatario_'+valPrimoLivello).style.display = 'none';
					if(document.getElementById('tipoQualificazioneP_'+valPrimoLivello).checked) {
						document.getElementById('titoloLegittimazione_'+valPrimoLivello).style.display = 'block';
						
					}					
				}
				if (selectedRuolo == '13') {
				// caso avente titolo
					document.getElementById('qualificazioneSogg_'+valPrimoLivello).style.display = 'none';
					document.getElementById('cointestatario_'+valPrimoLivello).style.display = 'none';	
					document.getElementById('primoIntestatario_'+valPrimoLivello).style.display = 'none';
					document.getElementById('titoloLegittimazione_'+valPrimoLivello).style.display = 'block';
					document.getElementById('tipoLegittimazione_'+valPrimoLivello).value = "R";
				}
				var esisteRuoloTipoTecnico = checkEsisteAltroTipoRuolo(IDelencoRuoli, 'tipoTec');
				if (!esisteRuoloTipoTecnico) {
					document.getElementById('qualificazioneProf_'+valPrimoLivello).style.display = 'none';
				}
				var esisteRuoloTipoImpresa = checkEsisteAltroTipoRuolo(IDelencoRuoli, 'tipoImp');
				if (!esisteRuoloTipoImpresa) {
					document.getElementById('qualificazioneProfImp_'+valPrimoLivello).style.display = 'none';
				}				
			}
			else {
				// gestione ruoli professionali
				var esisteRuoloTipoIntestatario = checkEsisteAltroTipoRuolo(IDelencoRuoli, 'tipoInt');
				document.getElementById('qualificazioneProf_'+valPrimoLivello).style.display = 'block';
				//alert("esisteRuoloTipoIntestatario = " + esisteRuoloTipoIntestatario );
				if (!esisteRuoloTipoIntestatario) {
					document.getElementById('qualificazioneSogg_'+valPrimoLivello).style.display = 'none';
					document.getElementById('titoloLegittimazione_'+valPrimoLivello).style.display = 'none';
				}
				var esisteRuoloTipoImpresa = checkEsisteAltroTipoRuolo(IDelencoRuoli, 'tipoImp');
				if (!esisteRuoloTipoImpresa) {
					document.getElementById('qualificazioneProfImp_'+valPrimoLivello).style.display = 'none';
				}								
			}
			
		}
	}
	
	function initRappresentanza (idtipoQualificazione) {
		// l'ultimo carattere dell'id determina il valore
		var strTipoQualificazione = idtipoQualificazione.split("_")[0];
		var valore = strTipoQualificazione[strTipoQualificazione.length-1];
		var valPrimoLivello = idtipoQualificazione.split("_")[1];
		if (valore == "P") {
			//in proprio allora nascondo il div dei dati di rappresentanza e mostro il div del titolo di legittimazione
			showDiv(idtipoQualificazione,'datiRappresentanza_'+valPrimoLivello,'');
			showDiv(idtipoQualificazione,'','titoloLegittimazione_'+valPrimoLivello);
			// il valore del tipoLegittimazione è P
			document.getElementById('tipoLegittimazione_'+valPrimoLivello).value='P';
		}
		else {
			//rappresentante allora mostro il div dei dati di rappresentanza e nascondo il div del titolo di legittimazione
			showDiv(idtipoQualificazione,'','datiRappresentanza_'+valPrimoLivello);
			showDiv(idtipoQualificazione,'titoloLegittimazione_'+valPrimoLivello,'')
			// azzero il valore del tipoLegittimazione che sarà assunto dall'avente titolo = R
			document.getElementById('tipoLegittimazione_'+valPrimoLivello).value='';
		}
	}
	
	function checkEsisteAltroTipoRuolo (IDelencoRuoli, codiceTipoRuolo) {		
		var parentNode = document.getElementById(IDelencoRuoli);
		var elencoRuoli = parentNode.querySelectorAll("select[id^='ruolo_']");
		//alert("elencoRuoli = " + elencoRuoli.length );
		for (var n = 0; n < elencoRuoli.length; n++) {
			var tipoRuolo = getAttrRuolo(elencoRuoli[n].value,"tipologia");
			if (codiceTipoRuolo == 'tipoInt' && tipoRuolo == 'INT') {
				// esiste almeno un ruolo di tipo intestatario tra quelli selezionati dall'utente
				return true;
			}
			if (tipoRuolo == 'tipoTec' && tipoRuolo == 'TEC') {
				// esiste almeno un ruolo di tipo tecnico tra quelli selezionati dall'utente
				return true;
			}
			if (tipoRuolo == 'tipoImp' && tipoRuolo == 'IMP') {
				// esiste almeno un ruolo di tipo impresa tra quelli selezionati dall'utente
				return true;
			}		
		}
		
	}
	
	function addField(parentNode,arrayIdFields,defaultValue,limit,className) {	
		// conto il livello del blocco da aggiungere, in base al numero di _ nell'id del button
		var buttAddId = parentNode.querySelector("#"+parentNode.id+" > button[id^='add']").id;
		var livello = buttAddId.split("_").length - 1;
		//alert("buttAddId " + buttAddId + " ha livello "+ livello);
				
		var counter = countElements(parentNode);
	    //alert("counter vale " + counter);
		var limitValue = limit;
		if (limit == 'unbounded') {
			limitValue = 99;
		}

		var currentId = getFirst(parentNode);
		var currentDiv = document.getElementById(currentId);
		//alert("div currentId " + currentId);
		var currentNumber = currentId.split("_")[livello].substr(1,1); 
		// riapro i div dell'elemento che uso come copia
		apriSoggetto (currentId);			
		
		if (counter == limitValue)  {
            alert("Attenzione! Non \u00E8 possibile aggiungere pi\u00F9 di " + counter + " elementi.");
        }
        else {
			var newDiv = document.createElement('div');	
			newDiv.innerHTML = currentDiv.innerHTML;
			
			var next = getValidNumber(parentNode,limit,livello);	
			
			var idSubStr = currentId.split("_");
			var newId = "";
			for (var i = 0; i < idSubStr.length; i++) {
				if (i == livello) {
					var indice = defineIndice(livello);
					idSubStr[i] = indice + next;
				}
				newId += (newId == "") ? idSubStr[i] : "_"+idSubStr[i];
			}
			//var newId = currentId.split("_")[0] + "_" + next;
			
			
			newDiv.setAttribute("id", newId);
			if (className != '') {
				newDiv.setAttribute("class", className);
			}
			var str = newDiv.innerHTML;
			var indice = defineIndice(livello);
			var newHtml = str.replace(new RegExp("_"+ indice + currentNumber, 'g'),"_"+ indice +next);
			newDiv.innerHTML = newHtml;
			//.appendChild(newDiv);
			var buttonElement = parentNode.querySelector("#"+parentNode.id+" > button[id^='add']");
			document.getElementById(parentNode.id).insertBefore(newDiv,buttonElement);

         }
		 if (className == 'soggetto elenco') {
			// se sto aggiungendo un soggetto, prima di inizializzare i bottoni remove, svuoto l'array degli elementi elenco
			//var childEle = newDiv.querySelectorAll(':scope :not([id$=b1]).elenco');
			var childElement = newDiv.querySelectorAll(':not([id$=b1]).elenco');
			//alert("rimuovo " + childElement.length + " elementi");
			for (var n=childElement.length; n>0;n--) {
				var index = n-1;
				//alert("rimuovo id " + childElement[index].id);
				//document.getElementById(childElement[index].id).remove();
				$("#"+childElement[index].id).remove();
				
			}
			//nascondo tutti i div contenuti negli elementi con class="soggetto elenco", eccetto quello nuovo
			var divSoggettoElenco = parentNode.querySelectorAll("div[id^='soggetto_']:not([id='"+newDiv.id+"'])");
			for (var i = 0; i < divSoggettoElenco.length; i++) {
				chiudiSoggetto(divSoggettoElenco[i].id);
			}
			// riporta la pagina in alto e mette il fuoco nel campo ruolo
			//$('html,body').scrollTop(0);
			$('html, body').animate({ scrollTop: 0 }, 'fast');
			newDiv.querySelector("select[id^='ruolo_']").focus();
		 }
		 // rimuove i pulsanti di remove
		 initRemoveElement(parentNode.id);
		 // reimposta il colore del testo di una select dopo la selezione
		 $("#"+parentNode.id+ " select").on( "focusout", function () {  if($(this).val() != "") {	$(this).css('color', colorPlaceHolder);}});
	}

	function apriSoggetto (divSoggettoElenco_id){
		var divSoggettoElenco = document.getElementById(divSoggettoElenco_id);
		var divElement = divSoggettoElenco.querySelectorAll('div');
		for (var n = 0; n < divElement.length; n++) {
			divElement[n].style.display = "block";
		}
		if (divSoggettoElenco.querySelector("span[id^='labelSoggetto_']"))
			divSoggettoElenco.querySelector("span[id^='labelSoggetto_']").innerHTML = "";
		
		
		$("div[id^='"+divSoggettoElenco_id+"']").each(function() {			
			$(this).find("select[id^='ruolo_']").each(function () {	
				initSoggetto(this.id);	
			});
		});	
		// fine		
	}
	
	function chiudiSoggetto (divSoggettoElenco_id) {
		var divSoggettoElenco = document.getElementById(divSoggettoElenco_id);
		//alert("nascondo " + divSoggettoElenco_id);
		var divElement = divSoggettoElenco.querySelectorAll('div');
		for (var n = 0; n < divElement.length; n++) {
			divElement[n].style.display = "none";
		}
		
		var nominativo = "";
		if (divSoggettoElenco.querySelector("[id^='TipoSoggettoPF_a']").checked) 
			nominativo = divSoggettoElenco.querySelector("[id^='Nome_']").value + ' '+ divSoggettoElenco.querySelector("[id^='Cognome_']").value;
		else 
			nominativo = divSoggettoElenco.querySelector("[id^='RagioneSociale_']").value; 
		//var buttonEdit ='<button type="button" class="btn btn-default btn-sm" style="margin-left:20px;margin-right:20px;"><span class="glyphicon glyphicon-pencil"></span> modifica</button>';
		var buttonEdit = '<span class="buttonEdit"><a href="#" onclick="apriSoggetto(' + "'"+ divSoggettoElenco.id +"'" +')"></a></span>';
		var spanHtml = buttonEdit + ' <span class="labelNominativo">' + nominativo +'</span>';
		divSoggettoElenco.querySelector("span[id^='labelSoggetto_']").innerHTML = spanHtml;	
	}
	
	
	function defineIndice(livello) {
	//numero massimo di livelli annidabili è 21, determinato dal numero di caratteri nella stringa seguente
	var strAlfabeto = "0abcdefghilmnopqrstuvz";
		var indice = strAlfabeto.charAt(livello);
		return indice;
	}		
	
	function getFirst(parentDiv) {
		var children = parentDiv.getElementsByTagName('div');
		var firstId = children[0].id;
		return firstId;
	}	
	
	function removeDiv(idDivDaRimuovere) {	
		if (confirm("Confermi di voler eliminare questi dati ?")){
			var child = document.getElementById(idDivDaRimuovere);
			var parentNodeId = child.parentNode.id;
			child.parentNode.removeChild(child);
			initRemoveElement(parentNodeId);
			//riordinaElementi(child.parentNode);
		}
	}
	function countElements(parentDiv) {
		var children = parentDiv.getElementsByTagName('div');
		return children.length ;
	}
	function riordinaElementi(parentDiv) {
		var children = parentDiv.getElementsByTagName('div');
		for (var i = 0; i < children.length; i++) {
			var str = children[i].innerHTML;
			var suffix = i+1;
			var newHtml = str.replace(new RegExp("_[1-9]", 'g'),"_" +suffix);
			children[i].innerHTML = newHtml;
			var newId = children[i].id.replace(new RegExp("_[1-9]", 'g'),"_" +suffix);
			children[i].setAttribute("id", newId);
		}
		if (children.length == 1) {
			children[0].querySelector("#remove_1").style.display = 'none';
		}
	}	
	function getValidNumber(parentDiv, limit, livello) {
		var validNumber = 0;
		//var children = parentDiv.getElementsByTagName('div');
		var children = parentDiv.querySelectorAll("#"+parentDiv.id+" > div");
		//alert("children.length " + children.length);
		var limitValue = limit;
		if (limit == 'unbounded') {
			limitValue = 99;
		}
		var flagLibero = 1;
		for (var n = 1; n < limitValue; n++) {		
			for (var i = 0; i < children.length; i++) {				
				var childNumber = children[i].id.split("_")[livello].substr(1,1);
				if (childNumber == n) {
					// se è usato imposto il flag a 0
					flagLibero = 0;
				}
			}
			if (flagLibero) {
				validNumber = n;
				break;
			}
			// riporto il flag a 1, per il prossimovalore di n
			flagLibero = 1;
		}
		//alert("validNumber " + validNumber);
		return validNumber;
	}		
	/* getLastElement non è usata */
	function getLastElement(parentDiv,type) {
				/*
				//omitting undefined null check for brevity
				if (myElements[i].id.lastIndexOf(prefix, 0) === 0) {
					items.push(myPosts[i]);
				}
				//var children = parentDiv.childNodes.length;
				var children = parentDiv.getElementsByTagName('div');
				//var children = parentDiv.getElementsByClassName("elenco");
				*/		
		//alert("getElement parent id " + parentDiv.id);
		var children = parentDiv.getElementsByTagName(type);
		//alert("getElement id " + children[children.length-1].id);
		return children[children.length-1];
	}		
	
	/*
	dati input (valore di controlllo, div da nascondere, div da mostrare)
	*/
	function showDiv (checkboxId, divIdToHide, divIdToShow) {
		if (document.getElementById(checkboxId).checked) {
			if (divIdToHide != null && divIdToHide != '') {
				//alert("divIdToHide =" + divIdToHide);
				document.getElementById(divIdToHide).style.display = 'none';
			}
			
			if (divIdToShow != null  && divIdToShow != ''){
				document.getElementById(divIdToShow).style.display = 'block';
			}
		}
	}

	/* FUNZIONI DI POPOLAMENTO*/
	
	function popolaNazioni(selectId) {
		
		var numOption = document.getElementById(selectId).length;
		//alert("numOption " + numOption);
		if (numOption < 2) {
			var output = [];

			$.each(elencoNazioni, function(key, value)
			{
			  if (key == "IT") 
				output.push('<option value="'+ key +'" selected>'+ value +'</option>');
			  else
				output.push('<option value="'+ key +'">'+ value +'</option>');
			});
			$('#'+selectId).html(output.join(''));
			$('#'+selectId).val('IT');
		}
	}
	
	function popolaProvincia(selectId) {
		
		var numOption = document.getElementById(selectId).length;
		//alert("numOption " + numOption);
		if (numOption < 2) {
			var output = [];

			$.each(elencoProvince, function(key, value)
			{
			  if (key == "")  
				output.push('<option value="'+ key +'">'+ value +'</option>');
			  else
				output.push('<option value="'+ key +'">'+ value +'</option>');
			});
			$('#'+selectId).html(output.join(''));
		}
	}	

	var updateSelectComuni = function(prov,idSelectComuni) {
		var listItems = "";
		if (prov != "") {
			for (var i = 0; i < elencoComuni[prov].length; i++){
				listItems+= "<option value='" + elencoComuni[prov][i].codistat + "'>" + elencoComuni[prov][i].denominazione + "</option>";
			}
		}
		else {
			listItems+= "<option value=''>comune</option>";
		}

		$("select#"+idSelectComuni).html(listItems);
	}

	function popolaComuni(idSelectProvincia, idSelectComuni) { 
		var selectedProv = $('#'+idSelectProvincia+' option:selected').val();
		updateSelectComuni(selectedProv,idSelectComuni);
	}

	function popolaElenco(selectId, nomeElenco) {		
		var numOption = document.getElementById(selectId).length;
		//alert("numOption " + numOption);
		if (numOption < 2) {
			var output = [];
			var elenco = eval(nomeElenco);
			$.each(elenco, function(key, value)
			{
			  if (key == "")  
				output.push('<option value="'+ key +'" >'+ value +'</option>');
			  else
				output.push('<option value="'+ key +'">'+ value +'</option>');
			});
			$('#'+selectId).html(output.join(''));
		}
	}	
	
	function popolaElencoPlus(selectId, nomeElenco) {		
		var numOption = document.getElementById(selectId).length;
		//alert("numOption " + numOption);
		if (numOption < 2) {
			var output = [];
			var elenco = eval(nomeElenco).array;
			for (var i = 0; i < elenco.length; i++){
				if(elenco[i].id == "") 
					output.push('<option value="' + elenco[i].id + '" selected >' + elenco[i].descrizioneBreve + '</option>');
				else
					output.push('<option value="' + elenco[i].id + '">' + elenco[i].descrizioneBreve + '</option>');
			}
			$('#'+selectId).html(output.join(''));
		}
	}	
	
	function getAttrRuolo(idRuolo,descAttributo) {
		var elenco = eval("ruoli").array;		
		for (var i = 0; i < elenco.length; i++){
			if(elenco[i].id == idRuolo) {
				var attributo = eval("elenco[i]."+descAttributo);
				return  attributo;
			}
		}
	}
		
	function popolaAventiTitolo (selectId) {
		var elencoSoggettiCoinvolti = document.getElementById("elencoSoggetti");	
		var soggettiCoinvolti = elencoSoggettiCoinvolti.querySelectorAll("[id^='soggetto_']");
		var numChildrenSoggettiCoinvolti = soggettiCoinvolti.length;
		var aventiTitoloRappresentati = new Array();
		var aventiTitoloRappresentatiIndex = 0;
		var aventiTitoloRappresentatiAssegnati = new Array();
		var aventiTitoloRappresentatiAssegnatiIndex = 0;	
		for (var i = 0; i < numChildrenSoggettiCoinvolti; i++) 
		{ 		
			var idSoggetto_id = soggettiCoinvolti[i].id;
			var prog = idSoggetto_id.split("_")[1].substr(1,1);
			// ciclo sui ruoli  divRuolo_a1_b1
			var parentNode = document.getElementById("elencoRuoli_a"+prog);
			var elencoRuoli = parentNode.querySelectorAll("select[id^='ruolo_']");
			//alert("elencoRuoli = " + elencoRuoli.length );		
			for (var n = 0; n < elencoRuoli.length; n++) {
				var idRuolo = elencoRuoli[n].value;
				if (idRuolo == '13'){
					if(document.getElementById("TipoSoggettoPF_a"+prog).checked) {
						aventiTitoloRappresentati[aventiTitoloRappresentatiIndex++] = document.getElementById("CodiceFiscale_a"+prog).value;
					}
					else {
						aventiTitoloRappresentati[aventiTitoloRappresentatiIndex++] = document.getElementById("PartitaIva_a"+prog).value;
					}
				}
			}
			var qualificazioneSoggettoRapp = document.getElementById("tipoQualificazioneA_a"+prog).checked;
			if (qualificazioneSoggettoRapp) {
				var soggettoAmministrato = document.getElementById("AventeTitoloRappresentato_a"+prog).value; 
				if (soggettoAmministrato == ""){				
					aventiTitoloRappresentatiAssegnati[aventiTitoloRappresentatiAssegnatiIndex++] = soggettoAmministrato;
				}
			}
		}
		var elenco = [];
		if (aventiTitoloRappresentati.length > 0) {
			for (var j = 0; j < aventiTitoloRappresentati.length; j++)
			{
				isAventeTitoloRappresentatoAssegnato = false;
				var aventeTitoloRappresentato = aventiTitoloRappresentati[j];

				for (var k = 0; k < aventiTitoloRappresentatiAssegnati.length; k++)
				{  
					if (aventeTitoloRappresentato == aventiTitoloRappresentatiAssegnati[k])
					{
						isAventeTitoloRappresentatoAssegnato = true;
					}
				}
				if (isAventeTitoloRappresentatoAssegnato == false)
				{
					elenco.push('<option value="' + aventeTitoloRappresentato + '">' + aventeTitoloRappresentato + '</option>');
				}  
			}	
			$('#'+selectId).html(elenco.join(''));
		}
		else {
			alert("Attenzione! Per poter selezionare un avente titolo è necessario procedere prima al suo inserimento come soggetto");
		}
		return;
	}

