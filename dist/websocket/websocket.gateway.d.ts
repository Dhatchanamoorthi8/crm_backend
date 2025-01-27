import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationService } from 'src/conversation/conversation.service';
export declare class ConversationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly conversationService;
    server: Server;
    constructor(conversationService: ConversationService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleReconnect(client: Socket): Promise<void>;
    handleMessage(client: Socket, payload: any): Promise<void>;
    handleJoinRoom(client: Socket, payload: {
        userid: number;
        createdby: number;
    }): Promise<void>;
}
