import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintService } from './complaint.service';
import { PrismaService } from 'src/prisma.service';
import { NotificationService } from '../notification/notification.service';

describe('ComplaintService', () => {
  let service: ComplaintService;
  let prismaService: PrismaService;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComplaintService,
        {
          provide: PrismaService,
          useValue: {
            complaint: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: NotificationService,
          useValue: {
            sendComplaintConfirmation: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ComplaintService>(ComplaintService);
    prismaService = module.get<PrismaService>(PrismaService);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a complaint and send notifications', async () => {
      const mockDto = {
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '1234567890',
      };

      const mockComplaint = {
        id: '1',
        caseNumber: 'CASE-123',
        ...mockDto,
      };

      jest.spyOn(prismaService.complaint, 'create').mockResolvedValue(mockComplaint);
      jest.spyOn(notificationService, 'sendComplaintConfirmation').mockResolvedValue(undefined);

      const result = await service.create(mockDto);

      expect(prismaService.complaint.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          customerName: 'John Doe',
          caseNumber: expect.any(String),
        }),
        include: {
          vehicle: true,
          documents: true,
        },
      });

      expect(notificationService.sendComplaintConfirmation).toHaveBeenCalledWith(
        'John Doe',
        'john.doe@example.com',
        '1234567890',
        expect.any(String),
      );

      expect(result).toEqual(mockComplaint);
    });

    it('should create a complaint even if notifications fail', async () => {
      const mockDto = {
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '1234567890',
      };

      const mockComplaint = {
        id: '1',
        caseNumber: 'CASE-123',
        ...mockDto,
      };

      jest.spyOn(prismaService.complaint, 'create').mockResolvedValue(mockComplaint);
      jest.spyOn(notificationService, 'sendComplaintConfirmation').mockRejectedValue(new Error('Notification failed'));

      const result = await service.create(mockDto);

      expect(prismaService.complaint.create).toHaveBeenCalled();
      expect(notificationService.sendComplaintConfirmation).toHaveBeenCalled();
      expect(result).toEqual(mockComplaint);
    });
  });

  describe('findAll', () => {
    it('should return all complaints', async () => {
      const mockComplaints = [
        { id: '1', caseNumber: 'CASE-123' },
        { id: '2', caseNumber: 'CASE-124' },
      ];

      jest.spyOn(prismaService.complaint, 'findMany').mockResolvedValue(mockComplaints);

      const result = await service.findAll();

      expect(prismaService.complaint.findMany).toHaveBeenCalledWith({
        include: {
          vehicle: true,
          documents: true,
        },
      });

      expect(result).toEqual(mockComplaints);
    });
  });

  describe('findOne', () => {
    it('should return a single complaint by ID', async () => {
      const mockComplaint = { id: '1', caseNumber: 'CASE-123' };

      jest.spyOn(prismaService.complaint, 'findUnique').mockResolvedValue(mockComplaint);

      const result = await service.findOne('1');

      expect(prismaService.complaint.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: {
          vehicle: true,
          documents: true,
        },
      });

      expect(result).toEqual(mockComplaint);
    });
  });

  describe('update', () => {
    it('should update a complaint', async () => {
      const mockDto = { customerName: 'Jane Doe' };
      const mockComplaint = { id: '1', caseNumber: 'CASE-123', customerName: 'Jane Doe' };

      jest.spyOn(prismaService.complaint, 'update').mockResolvedValue(mockComplaint);

      const result = await service.update('1', mockDto);

      expect(prismaService.complaint.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockDto,
        include: {
          vehicle: true,
          documents: true,
        },
      });

      expect(result).toEqual(mockComplaint);
    });
  });

  describe('search', () => {
    it('should search for complaints with filters', async () => {
      const mockFilters = { caseNumber: 'CASE-123' };
      const mockComplaints = [{ id: '1', caseNumber: 'CASE-123' }];

      jest.spyOn(prismaService.complaint, 'findMany').mockResolvedValue(mockComplaints);

      const result = await service.search(mockFilters);

      expect(prismaService.complaint.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          caseNumber: { contains: 'CASE-123', mode: 'insensitive' },
        }),
        include: {
          vehicle: true,
          documents: true,
        },
        orderBy: {
          dateReceived: 'desc',
        },
      });

      expect(result).toEqual(mockComplaints);
    });
  });
});