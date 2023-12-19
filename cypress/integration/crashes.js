/* eslint-disable require-jsdoc */
var Altruist = require("../../lib/countly");
var hp = require("../support/helper");

function initMain() {
    Altruist.init({
        app_key: "YOUR_APP_KEY",
        url: "https://your.domain.countly",
        test_mode: true
    });
}

function cause_error() {
    // eslint-disable-next-line no-undef
    undefined_function();
}

describe("Crashes tests ", () => {
    it("Checks if a caught crash is reported correctly", () => {
        hp.haltAndClearStorage(() => {
            initMain();
            Altruist.track_errors();
            try {
                cause_error();
            }
            catch (err) {
                Altruist.log_error(err);
            }
            cy.wait(3000).then(() => {
                cy.fetch_local_request_queue().then((rq) => {
                    cy.check_crash(rq[0], hp.appKey);
                });
            });
        });
    });
});
