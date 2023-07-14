import { ISODate } from "../lib-date/ISODate.js";
import { HttpMock } from "../lib-http/HttpMock.js";
import { Url } from "../lib-http/Url.js";
import { DateRange } from "../lib-date/DateRange.js";
export { OarApiMock };

let oarInfo = {
    '213': {
        '002': {
            '0001': "213-002-0001 Statement of Purposes and Principles  (1) The primary objectives of sentencing are to punish each offender appropriately, and to insure the security of the people in person and property, within the limits of correctional resources provided by the Legislative Assembly, local governments and the people. (2) Sentencing guidelines are intended to forward the objectives described in section (1) by defining presumptive punishments for felony convictions, subject to judicial discretion to deviate for substantial and compelling reasons; and presumptive punishments for post-prison or probation supervision violations, again subject to deviation. (3) The basic principles which underlie these guidelines are: (a) The response of the corrections system to crime, and to violation of post-prison and probation supervision, must reflect the resources available for that response. A corrections system that overruns its resources is a system that cannot deliver its threatened punishment or its rehabilitative impact. This undermines the system's credibility with the public and the offender, and vitiates the objectives of prevention of recidivism and reformation of the offender. A corrections system that overruns its resources can produce costly litigation and the threat of loss of system control to the federal judiciary. A corrections system that overruns its resources can increase the risk to life and property within the system and to the public. (b) Oregon's current sentencing system combines indeterminate sentences with a parole matrix. Although many citizens believe the indeterminate sentence sets the length of imprisonment, that sentence only sets an offender's maximum period of incarceration and the matrix controls actual length of stay. The frequent disparity between the indeterminate sentence length and time served under the matrix confuses and angers the public and damages the corrections system's credibility with the public. Sentences of imprisonment should represent the time an offender will actually serve, subject only to any reduction authorized by law. (c) Under sentencing guidelines the response to many crimes will be state imprisonment. Other crimes will be punished by local penalties and restrictions imposed as part of probation. All offenders released from prison will be under post-prison supervision for a period of time. The ability of the corrections system to enforce swiftly and sternly the conditions of both probation and post-prison supervision, including by imprisonment, is crucial. Use of state institutions as the initial punishment for crime must, therefore, leave enough institutional capacity to permit imprisonment, when appropriate, for violation of probation and post-prison supervision conditions. (d) Subject to the discretion of the sentencing judge to deviate and impose a different sentence in recognition of aggravating and mitigating circumstances, the appropriate punishment for a felony conviction should depend on the seriousness of the crime of conviction when compared to all other crimes and the offender's criminal history. (e) Subject to the sentencing judge's discretion to deviate in recognition of aggravating and mitigating circumstances, the corrections system should seek to respond in a consistent way to like crimes combined with like criminal histories; and in a consistent way to like violations of probation and post-prison supervision conditions.",
        }
    }
};

class OarApiMock extends HttpMock {
    //https://www.googleapis.com/calendar/v3/calendars/biere-library@thebierelibrary.com/events?timeMin=2023-07-01&timeMax=2023=07-15&test
    errors = {
        'success': false,
        'error': 'Invalid chapter'
    };

    getResponse(req) {
        let url = new Url(req.url);
        let data = [];
        //pretend we have parsed the url
        let query = url.getQuery();

        try {
            
            data = this.filterOar(query.chapter, query.section, query.rule);

        } catch (e) {
            data = {
                success: false,
                error: true,
                code: e.cause,
                message: e.message
            };
        }



        return Response.json(data);
    }

    filterOar(chapter, section, rule) {

        function fn() {
            //return true;
        }

        return oarInfo.filter(fn);
    }


}
