import { Injectable,  } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';
import convertXmlToJson from 'libs/convertXmlToJson';
@Injectable()
export class BookingService {
  constructor(private jwtService: JwtService,){}
  getHello(): string {
    return 'Hello World!';
  }

  async findXml(id:string){
   try{
    const {convertFileMainTest,convertXToJnor,convertXToJlib} = convertXmlToJson()
    const xmlFilePath = path.join(__dirname,'../../../..',`/public/XML/booking_${id}.xml`); 
    const xml = fs.readFileSync(xmlFilePath, 'utf-8');
    const data = convertFileMainTest(convertXToJlib(xml))
    const dataNor = convertFileMainTest(convertXToJnor(xml))
    return {result_1: data,result_2: dataNor,statusCode: 200}
   }catch(err){
    return {error:err,statusCode: 400}
   }
   
    
    
    

  }
  
}
