// Los
Table estudiantes { id integer [primary key] nombre varchar (150) [not null] 
  apellidos varchar (200) [not null] email varchar(100) [not null] matricula 
  varchar (100) [not null] edad integer [not null] semestre varchar [not null] 
  usuario_creacio varchar(100) [not null] fecha_creacion datetime [not null]
}
Table maestros { id integer [primary key] nombre varchar [not null] edad integer 
  [not null] telefono bigint [not null] correo varchar [not null] usuario_creacio 
  varchar(100) [not null] fecha_creacion datetime [not null]
}
Table materias { // materias id integer [primary key] nombre varchar [not null] 
  profesor_id number [not null] create_user varchar(100) [not null] create_date 
  datetime [not null]
}
Table calificaciones { id integer [primary key] estudiante_id integer [not null] 
  maestro_id integer [not null] materia_id integer [not null] create_user 
  varchar(100) [not null] create_date datetime [not null]
}
Ref: estudiantes.(id) > calificaciones.(estudiante_id) Ref: maestros.(id) > 
calificaciones.(maestro_id) Ref: materias.(id) > calificaciones.(materia_id)
