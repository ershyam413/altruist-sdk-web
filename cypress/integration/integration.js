var Altruist = require("../../lib/countly");
var hp = require("../support/helper");

/**
 *  init countly
 */
function initMain() {
    Altruist.init({
        app_key: "YOUR_APP_KEY",
        url: "https://your.domain.countly",
        debug: true,
        test_mode: true
    });
}

describe("Integration test", () => {
    it("int, no consent, no offline_mode", () => {
        initMain();
        const idType = Altruist.get_device_id_type();
        const id = Altruist.get_device_id();
        const consentStatus = Altruist.check_any_consent();
        Altruist.remove_consent();
        Altruist.disable_offline_mode();
        Altruist.add_event({ key: "test", count: 1, sum: 1, dur: 1, segmentation: { test: "test" } });
        Altruist.start_event("test");
        Altruist.cancel_event("gobbledygook");
        Altruist.end_event("test");
        Altruist.report_conversion("camp_id", "camp_user_id");
        Altruist.recordDirectAttribution("camp_id", "camp_user_id");
        Altruist.user_details({ name: "name" });
        Altruist.userData.set("set", "set");
        Altruist.userData.save();
        Altruist.report_trace({ name: "name", stz: 1, type: "type" });
        Altruist.log_error({ error: "error", stack: "stack" });
        Altruist.add_log("error");
        Altruist.fetch_remote_config();
        Altruist.enrollUserToAb();
        const remote = Altruist.get_remote_config();
        Altruist.track_sessions();
        Altruist.track_pageview();
        Altruist.track_errors();
        Altruist.track_clicks();
        Altruist.track_scrolls();
        Altruist.track_links();
        Altruist.track_forms();
        Altruist.collect_from_forms();
        Altruist.collect_from_facebook();
        Altruist.opt_in();
        // TODO: widgets
        // TODO: make better
        cy.fetch_local_request_queue().then((rq) => {
            cy.log(rq);
            hp.testNormalFlow(rq, "/__cypress/iframes/integration%2Fintegration.js", hp.appKey);
            expect(consentStatus).to.equal(true); // no consent necessary
            expect(remote).to.eql({}); // deepEqual
            expect(rq[0].device_id).to.equal(id);
            expect(rq[0].t).to.equal(idType);
        });
    });
});