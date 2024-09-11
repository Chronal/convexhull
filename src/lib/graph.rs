struct Edge<T> {
    from: usize,
    to: usize,
    edge_data: T,
}

struct Node<T> {
    node_data: T,
}

struct Graph<V, E> {
    edges: Vec<Edge<E>>,
    nodes: Vec<Node<V>>,
}
