import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/postgres/prisma/prisma.service';
import type { Order as PrismaOrder, OrderStatus, Prisma } from '@prisma/client';
import type { Order as DomainOrder } from '../interfaces/list-order.usecase.interface';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  protected includeRelations = {
    items: {
      include: {
        product: true,
      },
    },
  };

  async findAll(): Promise<PrismaOrder[]> {
    return this.prisma.order.findMany({
      include: this.includeRelations,
    });
  }

  async findOne(id: number): Promise<PrismaOrder | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  async findById(id: number): Promise<PrismaOrder | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  async get(
    filters: Partial<{ status: OrderStatus; clientId: number; total: number }>
  ): Promise<DomainOrder[]> {
    const where: Prisma.OrderWhereInput = {};

    if (filters.status) where.status = filters.status;
    if (filters.clientId) where.client_id = filters.clientId;
    if (filters.total) where.total = filters.total;

    const orders = await this.prisma.order.findMany({
      where,
      include: this.includeRelations,
    });

    // Mapeia para camelCase e estrutura esperada no domínio
    return orders.map(order => ({
      id: order.id,
      clientId: order.client_id,
      status: order.status as unknown as DomainOrder['status'],
      total: order.total,
      orderDate: order.order_date,
      updatedAt: order.updated_at,
      item: order.items,
    }));
  }

  async create(data: Prisma.OrderCreateInput): Promise<PrismaOrder> {
    return this.prisma.order.create({
      data,
      include: this.includeRelations,
    });
  }

  async update(id: number, data: Prisma.OrderUpdateInput): Promise<PrismaOrder> {
    return this.prisma.order.update({
      where: { id },
      data,
      include: this.includeRelations,
    });
  }

  async delete(id: number): Promise<PrismaOrder> {
    return this.prisma.order.delete({
      where: { id },
      include: this.includeRelations,
    });
  }
}
