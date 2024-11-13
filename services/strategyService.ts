/* eslint-disable @typescript-eslint/no-explicit-any */
// services/strategyService.ts
// allow any type for now


import { Node, Edge } from 'react-flow-renderer';

export interface StrategyNode extends Node {
  data: {
    label: string;
    type: string;
    config?: Record<string, any>;
  };
}

export interface Strategy {
  id?: number;
  name: string;
  description: string;
  is_active: boolean;
  asset_filters: Array<{
    type: string;
    value: any;
  }>;
  components: Array<{
    component_type: string;
    conditions: Array<{
      type: string;
      indicator?: string;
      comparison: string;
      value: any;
    }>;
    exit_conditions?: Array<{
      type: string;
      value: any;
    }>;
    parameters: Record<string, any>;
  }>;
}

export class StrategyService {
  private static async fetchWithAuth(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'An error occurred while processing your request');
    }

    return response.json();
  }

  static convertFlowToStrategy(
    nodes: StrategyNode[],
    edges: Edge[],
    name: string,
    description: string
  ): Strategy {
    const assetNodes = nodes.filter(node => node.data.type === 'asset');
    const components = nodes
      .filter(node => node.data.type !== 'asset')
      .map(node => {
        const nodeConnections = edges.filter(edge => edge.source === node.id);
        
        return {
          component_type: node.data.type,
          conditions: node.data.config?.conditions || [],
          exit_conditions: node.data.type === 'exit' ? node.data.config?.exit_conditions : undefined,
          parameters: {
            ...node.data.config?.parameters,
            connected_nodes: nodeConnections.map(conn => conn.target),
          },
        };
      });

    return {
      name,
      description,
      is_active: true,
      asset_filters: assetNodes.map(node => ({
        type: 'symbol',
        value: node.data.config?.symbol,
      })),
      components,
    };
  }

  static convertStrategyToFlow(strategy: Strategy): { nodes: StrategyNode[]; edges: Edge[] } {
    const nodes: StrategyNode[] = [];
    const edges: Edge[] = [];
    let nodeId = 1;

    // Add asset nodes
    strategy.asset_filters.forEach((filter, index) => {
      nodes.push({
        id: `asset-${nodeId}`,
        type: 'customNode',
        position: { x: 100, y: 100 + (index * 150) },
        data: {
          label: 'Asset',
          type: 'asset',
          config: {
            symbol: filter.value,
          },
        },
      });
      nodeId++;
    });

    // Add component nodes
    strategy.components.forEach((component, index) => {
      const node: StrategyNode = {
        id: `component-${nodeId}`,
        type: 'customNode',
        position: { x: 400, y: 100 + (index * 150) },
        data: {
          label: component.component_type.charAt(0).toUpperCase() + component.component_type.slice(1),
          type: component.component_type,
          config: {
            conditions: component.conditions,
            exit_conditions: component.exit_conditions,
            parameters: component.parameters,
          },
        },
      };
      nodes.push(node);

      // Add edges based on parameters.connected_nodes
      if (component.parameters.connected_nodes) {
        component.parameters.connected_nodes.forEach((targetId: string) => {
          edges.push({
            id: `edge-${nodeId}-${targetId}`,
            source: node.id,
            target: targetId,
          });
        });
      }

      nodeId++;
    });

    return { nodes, edges };
  }

  static async saveStrategy(
    nodes: StrategyNode[],
    edges: Edge[],
    name: string,
    description: string
  ): Promise<Strategy> {
    const strategy = this.convertFlowToStrategy(nodes, edges, name, description);
    return this.fetchWithAuth('/api/v1/strategies', {
      method: 'POST',
      body: JSON.stringify(strategy),
    });
  }

  static async loadStrategy(id: number): Promise<{ nodes: StrategyNode[]; edges: Edge[] }> {
    const strategy = await this.fetchWithAuth(`/api/v1/strategies/${id}`);
    return this.convertStrategyToFlow(strategy);
  }

  static async listStrategies(): Promise<Strategy[]> {
    return this.fetchWithAuth('/api/v1/strategies');
  }

  static async deleteStrategy(id: number): Promise<void> {
    await this.fetchWithAuth(`/api/v1/strategies/${id}`, {
      method: 'DELETE',
    });
  }
}