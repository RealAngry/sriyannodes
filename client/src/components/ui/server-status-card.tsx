import { RefreshCw } from "lucide-react";
import { useState } from "react";

export interface ServerNodeStatus {
  id: string;
  name: string;
  isOperational: boolean;
  cpuLoad: number;
  memoryUsage: number;
  networkUsage: number;
}

interface ServerStatusCardProps {
  nodes: ServerNodeStatus[];
  lastUpdated: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function ServerStatusCard({ nodes, lastUpdated, onRefresh, isLoading = false }: ServerStatusCardProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border max-w-4xl mx-auto">
      <div className="p-6 flex justify-between items-center border-b border-border">
        <div className="flex items-center">
          <span className="inline-block h-3 w-3 rounded-full bg-emerald-500 mr-2"></span>
          <span className="font-medium text-foreground">All Systems Operational</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
          <button 
            className="ml-2 text-primary hover:text-primary/80 transition-colors"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      {nodes.map(node => (
        <div key={node.id} className="p-6 border-b border-border">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <i className="fas fa-server text-primary mr-3"></i>
              <span className="font-medium text-foreground">{node.name}</span>
            </div>
            <div className="flex items-center">
              <span className={`inline-block h-2 w-2 rounded-full ${node.isOperational ? 'bg-emerald-500' : 'bg-destructive'} mr-2`}></span>
              <span className={`text-sm ${node.isOperational ? 'text-emerald-500' : 'text-destructive'}`}>
                {node.isOperational ? 'Operational' : 'Down'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">CPU Load</span>
                <span className="text-sm font-medium text-foreground">{node.cpuLoad}%</span>
              </div>
              <div className="performance-bar">
                <div className="performance-fill-green" style={{ width: `${node.cpuLoad}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Memory Usage</span>
                <span className="text-sm font-medium text-foreground">{node.memoryUsage}%</span>
              </div>
              <div className="performance-bar">
                <div className="performance-fill-blue" style={{ width: `${node.memoryUsage}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Network</span>
                <span className="text-sm font-medium text-foreground">{node.networkUsage}%</span>
              </div>
              <div className="performance-bar">
                <div className="performance-fill-purple" style={{ width: `${node.networkUsage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="p-4 text-center">
        <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center">
          View detailed status history
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
