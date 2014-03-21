// Type definitions for Angular UI Bootstrap 0.10.0
// Project: https://github.com/angular-ui/bootstrap
// Definitions by: Brian Surowiec <https://github.com/xt0rted>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../../typings/angularjs/angular.d.ts" />

declare module mm.foundation.modal {
    interface IModal {
        windowClass?: string;
        close (event: any);
    }

    interface IModalInstance {
        result: ng.IPromise<string>;
        opened: ng.IPromise<boolean>;
        close (result: string): void;
        dismiss (reason): void;
    }
}