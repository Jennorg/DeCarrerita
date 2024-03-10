#----crear BD-------
CREATE DATABASE IF NOT EXISTS decarrerita;
#seleccionar BD
USE decarrerita;

#---Tablas de usuario----
#usuario
CREATE TABLE IF NOT EXISTS usuarios(
	ci_user INT NOT NULL primary key,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) NOT NULL,
    correo VARCHAR(45)NOT NULL,
    contrasenna VARCHAR(45)NOT NULL,
    fecha_ingreso DATE,
    telefono int unsigned
)ENGINE=INNODB;

#cliente
CREATE TABLE IF NOT EXISTS cliente(
	id_client INT NOT NULL primary key,
    id_user INT NOT NULL unique,
    saldo INT NOT NULL,
    foreign key(id_user) references usuarios(ci_user)
)ENGINE=INNODB;

#Empleado Administrativo
CREATE TABLE IF NOT EXISTS Empleado_A(
	id_empleado INT NOT NULL primary key,
    id_user INT NOT NULL unique,
    foreign key(id_user) references usuarios(ci_user)
)ENGINE=INNODB;

#Administrador
CREATE TABLE IF NOT EXISTS administrador(
	id_admin INT NOT NULL primary key,
    id_user INT NOT NULL unique,
    foreign key(id_user) references usuarios(ci_user)
)ENGINE=INNODB;

#Chofer
CREATE TABLE IF NOT EXISTS chofer(
	id_chofer INT NOT NULL primary key,
    id_user INT NOT NULL unique,
    estado enum("DISPONIBLE","NO DISPONIBLE","NO APROBADO"),
    foreign key(id_user) references usuarios(ci_user)
)ENGINE=INNODB;

#-----Contacto Emergencia----
CREATE TABLE IF NOT EXISTS contactoEmergencia(
	ci_contacto INT NOT NULL primary key,
    id_chofer INT NOT NULL,
    nombre VARCHAR(45),
    telefono INT NOT NULL,
    parentesco VARCHAR(20),
    foreign key(id_chofer) references chofer(id_chofer)
)ENGINE=INNODB;

#----VEHICULO----
CREATE TABLE IF NOT EXISTS vehiculo(
	placa VARCHAR(10) NOT NULL primary key,
    id_dueño INT NOT NULL,
    anno INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    marca VARCHAR(45) NOT NULL,
    color VARCHAR(45) NOT NULL,
    descripcion VARCHAR(120) NOT NULL,
    status enum("EN REVISION","ACTIVO","INACTIVO"),
    foreign key(id_dueño) references chofer(id_chofer)
)ENGINE=INNODB;

#------Traslados-------
create table if not exists Traslados(
	id int not null primary key,
    id_chofer int not null,
    id_cliente int not null,
    id_vehiculo varchar(10) not null,
    latitudA int,
    longitudA int,
    profundidadA int,
    latitudB int,
    longitudB int,
    profundidadB int,
    distancia int,
    monto float,
    fecha date,
    hora_inicio time,
    hora_finalizacion time,
    estado enum("EN PROCESO","FINALIZADO","CANCELADO"),
    foreign key (id_chofer) references chofer(id_chofer),
    foreign key(id_cliente) references cliente(id_client),
    foreign key(id_vehiculo) references vehiculo(placa)
)engine=innodb;

#-----PruebaPsicologica------
create table if not exists pruebaPsico(
	id int not null primary key,
    id_chofer int not null,
    
    id_ea int,
    Respuesta1 varchar(100),
    Respuesta2 varchar(100),
    Respuesta3 varchar(100),
    Respuesta4 varchar(100),
    resultado int,
    foreign key(id_chofer) references chofer(id_chofer),
    foreign key(id_ea) references empleado_a(id_empleado)
)engine=InnoDB;

#-----Revision Vehiculo--------
create table if not exists Revision(
	id int not null primary key,
    id_vehiculo varchar(10) not null,
    id_ea int not null,
    fecha DATE,
    resultado int,
    foreign key (id_vehiculo) references vehiculo(placa),
	foreign key(id_ea) references empleado_a(id_empleado)
)engine=InnoDB;

#-----BANCO Y PAGOS----------
CREATE TABLE IF NOT EXISTS banco(
	rif_banco INT NOT NULL primary key,
    nombre VARCHAR(45) NOT NULL,
    descripcion VARCHAR(45) NOT NULL
)ENGINE=INNODB;

create table if not exists recarga(
	id int not null primary key,
    id_cliente int not null,
    id_banco int not null,
    monto int not null,
    n_referencia int not null,
    hora int,
    fecha date,
    foreign key (id_cliente) references cliente(id_client),
    foreign key (id_banco) references banco(rif_banco)
) engine=innodb;

create table if not exists PagoChofer(
	id int not null primary key,
    id_traslado int not null,
    id_banco int not null,
    id_ea int,
    referencia int,
    monto int,
    foreign key(id_traslado) references traslados(id),
    foreign key(id_banco) references banco(rif_banco),
    foreign key(id_ea) references empleado_a(id_empleado)
)engine=innodb;





