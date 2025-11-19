"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintController = void 0;
const common_1 = require("@nestjs/common");
const complaint_service_1 = require("./complaint.service");
const complaints_dto_1 = require("@repo/api/complaints/dto/complaints.dto");
let ComplaintController = class ComplaintController {
    complaintService;
    constructor(complaintService) {
        this.complaintService = complaintService;
    }
    findAll() {
        return this.complaintService.findAll();
    }
    search(filters) {
        return this.complaintService.search(filters);
    }
    findOne(id) {
        return this.complaintService.findOne(id);
    }
    create(createComplaint) {
        return this.complaintService.create(createComplaint);
    }
};
exports.ComplaintController = ComplaintController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComplaintController.prototype, "create", null);
exports.ComplaintController = ComplaintController = __decorate([
    (0, common_1.Controller)('complaint'),
    __metadata("design:paramtypes", [complaint_service_1.ComplaintService])
], ComplaintController);
//# sourceMappingURL=complaint.controller.js.map