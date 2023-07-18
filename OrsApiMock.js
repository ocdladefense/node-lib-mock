import { HttpMock } from "/WEBC-ORS/node_modules/@ocdladefense/lib-http/HttpMock.js";
import { Url } from "/WEBC-ORS/node_modules/@ocdladefense/lib-http/Url.js";
export { OrsApiMock };


let ch813section10 = `813.010 Driving under the influence of intoxicants; penalty. (1) A person commits the offense of driving while under the influence of intoxicants if the person drives a vehicle while the person: <br /> (a) Has 0.08 percent or more by weight of alcohol in the blood of the person as shown by chemical analysis of the breath or blood of the person made under ORS 813.100, 813.140 or 813.150;<br />(b) Is under the influence of intoxicating liquor, cannabis, psilocybin, a controlled substance or an inhalant; <br /> (c) Is under the influence of any combination of intoxicating liquor, cannabis, psilocybin, a controlled substance and an inhalant; or <br />  (d) Within two hours after driving a vehicle, and without consuming alcohol in the intervening time period, has 0.08 percent or more by weight of alcohol in the blood of the person, as shown by chemical analysis of the breath or blood of the person made under ORS 813.100, 813.140 or 813.150.`;
let ch813section11 = `813.011 Felony driving under the influence of intoxicants; penalty. (1) Driving under the influence of intoxicants under ORS 813.010 shall be a Class C felony if at least two times in the 10 years prior to the date of the current offense the defendant has been convicted of any of the following offenses in any combination:<br />(a) Driving under the influence of intoxicants in violation of ORS 813.010, or its statutory counterpart in another jurisdiction.<br /> (b) A driving under the influence of intoxicants offense in another jurisdiction that involved the impaired driving or operation of a vehicle, an aircraft or a boat due to the use of intoxicating liquor, cannabis, a controlled substance, an inhalant or any combination thereof.<br />(c) An offense in another jurisdiction that involved driving or operating a vehicle, an aircraft or a boat while having a blood alcohol content above that jurisdiction’s permissible blood alcohol content.`;

let ch814section10 = `814.010 Appropriate responses to traffic control devices. This section establishes appropriate pedestrian responses to specific traffic control devices for purposes of ORS 814.020. Authority to place traffic control devices is established under ORS 810.210. Except when acting under the direction of a police officer, a pedestrian is in violation of ORS 814.020 if the pedestrian makes a response to a traffic control device that is not permitted under the following:<br />(1) A pedestrian facing a traffic control device with a green light may proceed across the roadway within any marked or unmarked crosswalk unless prohibited from doing so by other traffic control devices.<br />(2) A pedestrian facing a traffic control device with a green arrow signal light may proceed across the roadway within any marked or unmarked crosswalk unless prohibited from doing so by other traffic control devices.`;

const chapters = {};

chapters["813"] = [ch813section10, ch813section11];
chapters["814"] = [ch814section10];

class OrsApiMock extends HttpMock {
    //https://appdev.ocdla.org/books-online/index.php?chapter=813&section=010
    errors = {
        'success': false,
        'error': 'Invalid inputs'
    };


    getResponse(req) {
        let url = new Url(req.url);
        let data = [];

        let query = url.getQuery();


        try {
            if (!chapters[query.chapter]) {
                throw new RangeError("Chapter does not exist.", { cause: "INVALID_CHAPTER" });
            }
            if (!query.section) {
                data = this.filterSections(query.chapter);
            }
            data = this.filterSections(query.chapter, query.section);

        } catch (e) {
            data = e.message;
        }



        return new Response(data);
    }

    filterSections(chapter, section = null) {
        let results = [];
        let ch = chapters[chapter];
        if (!section) {
            return ch;
        }
        for (let i = 0; i < ch.length; i++) {
            let sect = ch[i];
            let parts = sect.slice(0, 7);
            parts = parts.split(".");
            if (parts[1] == section) {
                results.push(sect);
            }
        }
        console.log(results.length);
        if (results.length == 0) {
            throw new RangeError("Section does not exist.", { cause: "INVALID_SECTION" });
        }
        return results;
    }


}
