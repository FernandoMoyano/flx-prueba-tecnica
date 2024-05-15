-- En este archivo deben estar tus ejercicios de consultas sql


--1_ EMPLEADOS ORDENADOS ALFABETICAMENTE (A-Z)
SELECT NOMBRES 
FROM EMPLEADOS 
ORDER BY NOMBRES DESC;


--2_EMPLEADOS DE SOPORTE
SELECT NOMBRES, PUESTOS.PUESTO, LOCALIDADES.LOCALIDAD 
FROM EMPLEADOS 
JOIN PUESTOS ON EMPLEADOS.PUESTO_ID = PUESTOS.ID 
JOIN DEPARTAMENTOS ON EMPLEADOS.DEPARTAMENTO_ID = DEPARTAMENTOS.ID 
JOIN LOCALIDADES ON DEPARTAMENTOS.LOCALIDAD_ID = LOCALIDADES.ID 
WHERE PUESTOS.PUESTO = 'Soporte';
