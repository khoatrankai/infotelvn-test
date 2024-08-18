import { XMLParser } from "fast-xml-parser";


export default function convertXmlToJson() {
    
    const convertXToJlib = (data:any)=>{
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_',
          });
          return parser.parse(data);
    }
    const convertXToJnor = (data:any)=>{
        const sanitizeXML = (xmlString:string)=> {
            return xmlString.replace(/(\r\n|\n|\r)/g, '').replace(/<\?[\s\S]*?\?>/g, "");
        }
        const xmlToJson = (data:any)=>{
            let res:any = {}
            let dataNew = ''
            let checkTagArr = ''
            let checkTag = false
            dataNew = data
            while(dataNew !== '' && dataNew){
              const dt = dataNew.match(/<[^/][^>]*>/g)
              if(dt){
                const dataTag =  dt[0]
                const nameTag = dataTag.match(/<([^\s>]+)/)[1]
                if(checkTagArr === nameTag){
                  checkTag = true
                }
                checkTagArr = nameTag
               
                
                const regex = new RegExp(`<${nameTag}\\b[^>]*>([\\s\\S]*?)<\\/${nameTag}>|<${nameTag}\\b[^>]*\/>`, 'i');
                const match = dataNew.match(regex);
                if(match){
                  
                  if(!match[1]){
                   
                    let resAttribute = {}
                    const attribute = match[0].match(/(\w+)="([^"]*)"/g);
                    if(attribute){
                      attribute.forEach(e=>{
                        const dataAttr = e.replaceAll('"','').split('=');
                        resAttribute = {...resAttribute,['@_'+dataAttr[0]]: dataAttr[1]}
                      })
                      if(checkTag && res[nameTag]){
                        if(Array.isArray(res[nameTag])){
                          res = {...res,[nameTag]: [...res[nameTag],resAttribute]}
                        }else{
                          res = {...res,[nameTag]: [res[nameTag],resAttribute]}
                        }
                       
                        
                      }else{
                        res = {...res,[nameTag]: resAttribute}
                      }
                      
                    }else{
                      if(checkTag && res[nameTag]){
                        if(Array.isArray(res[nameTag])){
                          res = {...res,[nameTag]: [...res[nameTag],""]}
                        }else{
                          res = {...res,[nameTag]: [res[nameTag],""]}
                        }
                        
                      }else{
                        res = {...res,[nameTag]:""}
                      }
                      
                    }                
                  }else{
                    
                    let resAttribute = {}
                    const attribute = match[0].replace(match[1],'').match(/(\w+)="([^"]*)"/g);
                    if(attribute){
                      attribute.forEach(e=>{
                        const dataAttr = e.replaceAll('"','').split('=');
                        resAttribute = {...resAttribute,['@_'+dataAttr[0]]: dataAttr[1]}
                      })
                    }
                    const dtCheck = match[1].match(/<[^>]*>/g)
                    if(dtCheck){
                      if(checkTag && res[nameTag]){
                        if(Array.isArray(res[nameTag])){
                          res = {...res,[nameTag]: [...res[nameTag],xmlToJson(match[1])]}
                        }else{
                          res = {...res,[nameTag]: [res[nameTag],xmlToJson(match[1])]}
                        }
                        
                      }else{
                        res = {...res,[nameTag]: xmlToJson(match[1])}
                      }
                      
                     
                    }else{
                     
                      const dtFilter = match[0].replace(match[1],'')
                      const text = match[1] || ""
                      let resAttribute = {}
                      const attribute = dtFilter.match(/(\w+)="([^"]*)"/g);
                      if(attribute){
                        attribute.forEach(e=>{
                          const dataAttr = e.split('=');
                          resAttribute = {...resAttribute,['@_'+dataAttr[0]]: dataAttr[1]}
                        })
                        if(checkTag && res[nameTag]){
                          if(Array.isArray(res[nameTag])){
                            res = {...res,[nameTag]: [...res[nameTag],{...resAttribute,'#text':text}]}
                          }else{
                            res = {...res,[nameTag]: [res[nameTag],{...resAttribute,'#text':text}]}
                          }
                          
                        }else{
                          res = {...res,[nameTag]: {...resAttribute,'#text':text}}
                        }
                        
                      }else{
                        if(checkTag && res[nameTag]){
                          if(Array.isArray(res[nameTag])){
                            res = {...res,[nameTag]: [...res[nameTag],text]}
                          }else{
                            res = {...res,[nameTag]: [res[nameTag],text]}
                          }
                          
                        }else{
                          res = {...res,[nameTag]:text}
                        }
                        
                      }
                    }
                    if(Object.keys(resAttribute).length>0){
                      res = {...res,[nameTag]:{...res[nameTag],...resAttribute}}
                    }
                  }
                  dataNew = dataNew.replace(match[0],'')
    
                  
                  
                }else{
                  break;
                }
              }else{
                break;
              }
              
            }
            if(Object.keys(res).length>0){
              return res
            }else{
              return ""
            }
      }
      return xmlToJson(sanitizeXML(data))
    }
    const convertFileMainTest = (data:any)=>{
        let totalData = {
            "confirmation_no": "",
            "resv_name_id": "",
            "arrival": "",
            "departure": "",
            "adults": -1,
            "children": -1,
            "roomtype": "", 
            "ratecode": "",
            "rateamount": {
             
            },
            "guarantee": "",
            "method_payment": "",
            "computed_resv_status": "",
            "last_name": "",
            "first_name": "",
            "title": "",
            "phone_number": "",
            "email": "",
            "booking_balance": -1,
            "booking_created_date": "",
          }
        const checkXML = (name:string,data:any)=>{
            if(typeof data === "string"){
              if(totalData.roomtype === '' && name === '@_roomTypeCode'){
                totalData = {...totalData,roomtype: data}
              }
              if(totalData.guarantee === '' && name === '@_guaranteeType'){
                totalData = {...totalData,guarantee: data}
              }
             
              if(totalData.computed_resv_status === '' && name === '@_computedReservationStatus'){
                totalData = {...totalData,computed_resv_status: data}
              }
              if(totalData.phone_number === '' && name === 'c:PhoneNumber'){
                totalData = {...totalData,phone_number: '0'+data}
              }
              if(totalData.method_payment === '' && name === '@_PaymentType'){
                totalData = {...totalData,method_payment: data}
              }
              if(totalData.ratecode === '' && name === '@_ratePlanCode'){
                totalData = {...totalData,ratecode: data}
              }
              if(name === 'hc:StartDate'){
                totalData = {...totalData,arrival: data.split('T')[0]}
              }
              if(name === 'hc:EndDate'){
                totalData = {...totalData,departure: data.split('T')[0]}
              }
              
              return
              
            }else{
              if(name === 'hc:RoomRateAndPackages'){
                if(Object.keys(totalData.rateamount).length === 0){
                 
                  totalData = {...totalData,rateamount:{amount: data['@_TotalCharges'] || data['hc:Charges']['hc:Amount']['#text'],currency: data['hc:Charges']['hc:Amount']?.['@_currencyCode'] || data['hc:Charges'][0]['hc:Amount']?.['@_currencyCode']}}
                  
                }
              }
              if(totalData.booking_balance === -1 && name === 'hc:CurrentBalance'){
                totalData = {...totalData,booking_balance: data['#text']}
              }
              if(totalData.booking_created_date === '' && name === 'r:ReservationHistory'){
                totalData = {...totalData,booking_created_date: data['@_insertDate'].split('T')[0]}
              }
              if(name === 'HotelReservation'){
                  totalData ={...totalData,resv_name_id: data['r:UniqueIDList']['c:UniqueID'][1]['#text'],confirmation_no: data['r:UniqueIDList']['c:UniqueID'][0]['#text'] || data['r:UniqueIDList']['c:UniqueID'][0][0]['#text']}
              }
              if(name === 'r:ResGuest'){
                console.log(data)
                const fullname = data['r:Profiles']['Profile']['Customer']?.['PersonName'] || data['r:Profiles']['Profile'][0]['Customer']['PersonName']
                totalData = {...totalData,first_name: fullname['c:firstName'] || '',last_name: fullname['c:lastName']|| '',title: fullname['c:nameTitle']|| ''}
              }
              if(name === 'hc:GuestCounts'){
                if(data['@_isPerRoom']){
                  totalData = {...totalData,adults: data['hc:GuestCount'][0]['@_count'],children:data['hc:GuestCount'][1]['@_count']}
                  
                }
              }
              
            }
      
            const dataArr = Object.keys(data)
            dataArr.forEach(element => {
              checkXML(element,data[element])
            });
        
          }

          checkXML('',data)
          return totalData
    }
    
    return {convertXToJlib,convertXToJnor,convertFileMainTest}
}