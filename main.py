from qiskit import QuantumCircuit, Aer, transpile
from collections import defaultdict
import matplotlib.pyplot as plt


def get_random_numbers(n: int, sim) -> list:
    random_generator_qc = QuantumCircuit(1)
    random_generator_qc.h(0)
    random_generator_qc.measure_all()
    compiled_qc = transpile(random_generator_qc, sim)
    return [int(item) for item in sim
            .run(compiled_qc, shots=n, memory=True)
            .result()
            .get_memory()]


sim = Aer.get_backend("aer_simulator")


def n():
    arr = get_random_numbers(8, sim)
    arr = [str(x) for x in arr]
    s = "".join(arr)
    i = int(s, 2)
    return i + 1


bins = defaultdict(lambda: [])
for count in range(10000):
    if (count % 10 == 0):
        print(count)
    i = n()
    q = i // 16
    r = i % 16
    bins[q].append(i)


x = list(bins.keys())
y = [len(x) for x in bins.values()]

print(x)
for i in range(len(x)):
    print(x[i], y[i])

plt.scatter(x, y, label=y)
ax = plt.gca()
ax.set_ylim([0, 700])
plt.show()
