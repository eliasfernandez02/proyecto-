const { 
    createBot, 
    createProvider, 
    createFlow, 
    addKeyword, 
} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const WsProvider = require('@bot-whatsapp/provider/baileys')
const DBProvider = require('@bot-whatsapp/database/mock')


//Creacion de los flujos para recibir y enviar los mensajes 

const flujoPrincipal = addKeyword(['hola','ola','ole','buenas','buenas tardes','buenas noches','buenos días','buenos dias','menu principal'])
.addAnswer ('Hola, por favor escriba informacion')
const flujoSENNOVA = addKeyword('SENNOVA').addAnswer ('Es el Sistema de Investigación, Innovación y Desarrollo Tecnológico a través del cual se ejecuta la política de contribución del SENA a la Ciencia y Tecnología del País; fortaleciendo capacidades locales en productividad, competitividad, generación de conocimiento y pertinencia de la Formación Profesional Integral.')
const flujoAgrosena = addKeyword('Agrosena').addAnswer ('Es una estrategia que fortalece los procesos de formación profesional en la ruralidad Colombiana a través de actividades de extensión agropecuaria para mejorar las condiciones técnicas y productivas que impactan positivamente la calidad de vida de las poblaciones.')
const flujoPortafolio = addKeyword('Portafolio 2023 CAM').addAnswer ('https://me-qr.com/es/mobile/pdf/13034442')

//Botones para interactuar

const flujoBotons = addKeyword('informacion','información').addAnswer('A continuaccion escoja el tema que quiere obtener informacion', {
    buttons: [{ body: 'SENNOVA' }, { body: 'Agrosena' }, { body: 'Portafolio 2023 CAMA' }],
})

const flujoclik  = addkeyword('SENNOVA', 'menu anterior ') .addAnswer('porfavor escoge cual de los siguientes desea consultar ' ,{
    buttons: [ { body: 'innovacion'}, { body:'investigacion' }, {body:'desarrollo tecnologico'}, {body:'menu anterior'}, {body: 'menu principal'}]  })

//Creacion de los flujos para recibir y enviar los mensajes

const flujocon = addKeyword('innovacion') .addAnswer('Desde este programa SENNOVA busca realizar acciones que contribuyan al fortalecimiento de los procesos de investigación, desarrollo tecnológico e innovación en el sector productivo Colombiano y en los Centros de Formación, cuyos resultados inciden sobre los niveles de productividad y competitividad del mismo, así como en la formación profesional integral y la formación para el trabajo. Al primer semestre del 2020 sennova cuenta con: 640 Articulos sometidos, 34 Libros publicados, 42 revistas registradas ante la biblioteca Nacional de colombia, 130 eventos de divulgacion, 2 patentes otorgadas por la superintendencia de industria y comercio (SIC).  158 Numero de proyectos de innovacion aprobados (2020) en los (92) centros de formacion. 326 Empresas beneficiadas en las convocatorias de fomento a la innovacion y desarrollo tecnologico en las ultimas tres convocatorias',{
      buttons : [ { body: 'menu anterior'}, {body: 'menu principal'}]  })
const flujocan = addKeyword('investigacion') .addAnswer('Se realizan actividades enfocadas a fortalecer la política de formación profesional integral y contribuir a su pertinencia y calidad, con base en el análisis de información y elaboración de estudios e investigaciones, de igual forma, se adelantan estrategias para la gestión del conocimiento generado por la investigación aplicada desarrollada en los Centros y por los resultados de los proyectos con el fin de incorporarlos a la formación, divulgarlos y transferirlos a la formación profesional, la formación para el trabajo y al sector productivo. La comunidad sena puede participar activamente en la investigacion apartir de ls siguientes estrategias:  semilleros de investigacion, grupos de investigacion de aplicada, desarrollo de proyectos de investigacion aplicada y desarrollo tecnologico por redes de conocimiento,en los centros de formacion',{  
     buttons:[{body: 'menu anteriro'}, {body: 'menu principal'}] })

const flujostven = addKeyword('desarrollo tecnologico') .addAnswer('sennova adelanta iniciativos que inpulsan el programa de desarrollo tecnolgico a traves de las lineas programaticas generando capacidades de ciencia,tecnologicas e innovacion en los centros de formacion como estrategias para impactar y resolver las necesidades inmediatas del sector productivo y en las regiones. Al primer semestre del 2019 SENNOVA  cuenta con: 5 Tecnoparques a nivel nacional, 10 Tecnoacademias a nivel nacional, 12 Laboratorios acreditados y mas de 17 en preparacion para solicitar inicio de proceso de acreditacion, 148 proyectos de servicios tecnologicos aprobados para el 2019, 110 proyectos en ejecucion para modernizar tecnologicamente a 82 centros de fromacion a nivel nacional (2019),  a partir del 2019 el sena aporta a la implementacion de la estrategia de la liea programatica de extencionismo tecnologico.',{  
      buttons:[{ body:'menu anterior '}, { body:'meno principal'}]  })

//Llamada de los flujos
const main = async () => {

    const adapterDB = new DBProvider()
    const adapterFlow = createFlow([flujoPrincipal, flujoBotons, flujoSENNOVA, flujoAgrosena, flujoPortafolio])
    const adapterProvider = createProvider(WsProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })


    QRPortalWeb()
}

main()