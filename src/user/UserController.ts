import type { Request, Response } from "express";
import { Router } from "express";
import multer, { Multer, StorageEngine } from "multer";
import { v4 } from "uuid";
import { IllegalPictureFormatError } from "../util/errors";
import DashboardController from "./dashboard/DashboardController";
import DepositsService from "./deposits/DepositsService";
import UploadDepositService from "./deposits/upload-deposit-service";
import ChangeProfilePictureService from "./profile/change-profile-picture.service";
import ProfileService from "./profile/ProfileService";
import WithdrawalsService from "./withdrawals/WithdrawalsService";

export default class UserController {

    readonly router: Router;
    private dashboardController: DashboardController;
    private depositsService: DepositsService;
    private withdrawalsService: WithdrawalsService;
    private profileService: ProfileService;
    private changeProfilePictureService: ChangeProfilePictureService;
    private upload: Multer;
    private uploadDepositService: UploadDepositService
    private storage: StorageEngine;

    constructor() {
        this.router = Router();
        this.dashboardController = new DashboardController();
        this.depositsService = new DepositsService();
        this.withdrawalsService = new WithdrawalsService();
        this.profileService = new ProfileService();
        this.uploadDepositService = new UploadDepositService();
        this.changeProfilePictureService = new ChangeProfilePictureService();
        this.storage = multer.diskStorage({
            destination: "../../public",
            filename: (req, file, cb) => {
                const fileName = file.originalname
                    .toLowerCase()
                    .split(" ")
                    .join("-");
                cb(null, v4() + "-" + fileName);
            }
        });
        this.depositStorage = multer.diskStorage({
            destination: "../../deposits",
            filename: function (req, file, cb)  {
                const fn = 
            }
        })
        this.upload = multer({
            storage: this.storage,
            fileFilter: (req, file, cb) => {
                if(file.mimetype === "image/png" ||
                    file.mimetype === "image/jpg" ||
                    file.mimetype === "image/jpeg"
                ) {
                    cb(null, true);
                } else {
                    cb(null, false);
                    return cb(new IllegalPictureFormatError());
                }
            }
        })
        this.routes();
    }

    private routes(): void {
        this.router.get("/dashboard", this.dashboardController.router);
        this.router.get("/deposits", this.depositsService.sendTxns);
        this.router.get("/withdrawals", this.withdrawalsService.sendWithdrawals);
        this.router.get("/profile", this.profileService.userDetails);
        this.router.post("/profile/password/change", this.upload.single("avatar"), this.changeProfilePictureService.reqHandler);
        this.router.post("/upload-deposit", this.upload.single("deposit"), this.uploadDepositService.reqHandler);
    }

}